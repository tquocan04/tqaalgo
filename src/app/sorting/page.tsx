"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AlgorithmVisualizer from '@/components/d3/AlgorithmVisualizer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Play, Pause, RefreshCw, Zap } from 'lucide-react'; // Thêm icon Zap cho tốc độ

const VisualizerPage: React.FC = () => {
    const searchParams = useSearchParams();
    const initialAlgorithm = searchParams.get('algorithm') || 'bubble-sort';

    const [data, setData] = useState<number[]>([]);
    const [algorithm, setAlgorithm] = useState<string>(initialAlgorithm);
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    // --- 1. STATE VÀ REF MỚI CHO TỐC ĐỘ ---
    const [speed, setSpeed] = useState<number>(1); // State để cập nhật UI
    const speedRef = useRef<number>(1); // Ref để logic luôn đọc được giá trị mới nhất

    const isCancelledRef = useRef<boolean>(false);
    const resumeResolverRef = useRef<(() => void) | null>(null);
    const isPausedRef = useRef<boolean>(false);

    const [activeIndices, setActiveIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const [pivotIndex, setPivotIndex] = useState<number | null>(null);
    const [mergingIndices, setMergingIndices] = useState<number[]>([]);

    const resetIndices = useCallback(() => {
        setActiveIndices([]);
        setSortedIndices([]);
        setPivotIndex(null);
        setMergingIndices([]);
    }, []);

    const generateNewDataAndReset = useCallback(() => {
        isCancelledRef.current = true;
        if (resumeResolverRef.current) {
            resumeResolverRef.current();
            resumeResolverRef.current = null;
        }

        setIsSorting(false);
        setIsPaused(false);
        isPausedRef.current = false;

        resetIndices();
        setData(Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 5));
    }, [resetIndices]);

    const handlePause = () => {
        isPausedRef.current = true;
        setIsPaused(true);
    };

    const handleResume = () => {
        isPausedRef.current = false;
        setIsPaused(false);
        if (resumeResolverRef.current) {
            resumeResolverRef.current();
            resumeResolverRef.current = null;
        }
    };

    const handleStop = () => {
        isCancelledRef.current = true;
        if (isPausedRef.current && resumeResolverRef.current) {
            isPausedRef.current = false;
            setIsPaused(false);
            resumeResolverRef.current();
            resumeResolverRef.current = null;
        }
        setIsSorting(false);
        setIsPaused(false);
        isPausedRef.current = false;
        resetIndices();
    };

    // --- 2. HÀM XỬ LÝ KHI THAY ĐỔI TỐC ĐỘ ---
    const handleSpeedChange = (value: string) => {
        const newSpeed = parseFloat(value);
        setSpeed(newSpeed);
        speedRef.current = newSpeed;
    };

    useEffect(() => {
        generateNewDataAndReset();
    }, [algorithm, generateNewDataAndReset]);

    // --- 3. CẬP NHẬT PAUSABLE_SLEEP ĐỂ TÍNH TOÁN DELAY DỰA TRÊN TỐC ĐỘ ---
    const pausableSleep = async (baseMs: number) => {
        // Tốc độ càng cao, thời gian chờ (delay) càng ngắn
        const actualDelay = baseMs / speedRef.current;

        await new Promise(resolve => setTimeout(resolve, actualDelay));

        if (isPausedRef.current) {
            await new Promise<void>(resolve => {
                resumeResolverRef.current = resolve;
            });
        }
        if (isCancelledRef.current) {
            throw new Error('AlgorithmCancelled');
        }
    };

    const runBubbleSort = async () => {
        const arr = [...data];
        const n = arr.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setActiveIndices([j, j + 1]);
                await pausableSleep(300);

                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setData([...arr]);
                    await pausableSleep(300);
                }
            }
            setSortedIndices((prev) => [...prev, n - 1 - i]);
        }
    };

    // FIX 1: quickSortHelper chạy tuần tự, không dùng Promise.all
    const quickSortHelper = async (arr: number[], low: number, high: number) => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            if (pi === -1) return; // Bị hủy trong lúc partition

            setSortedIndices(prev => [...prev, pi]);

            // Chạy tuần tự để tránh xung đột khi tạm dừng
            await quickSortHelper(arr, low, pi - 1);
            await quickSortHelper(arr, pi + 1, high);
        } else if (low === high) {
            // Đánh dấu phần tử đơn lẻ là đã sắp xếp
            setSortedIndices(prev => [...prev, low]);
        }
    };

    const partition = async (arr: number[], low: number, high: number): Promise<number> => {
        const pivot = arr[high];
        setPivotIndex(high);
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (isCancelledRef.current) return -1;

            setActiveIndices([j, i < low ? -1 : i]);
            await pausableSleep(400);

            if (arr[j] < pivot) {
                i++;
                setActiveIndices([j, i, high]);
                await pausableSleep(400);
                [arr[i], arr[j]] = [arr[j], arr[i]];
                setData([...arr]);
                await pausableSleep(400);
            }
        }

        if (isCancelledRef.current) return -1;

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setData([...arr]);
        setPivotIndex(null);
        await pausableSleep(500);
        return i + 1;
    };

    const runQuickSort = async () => {
        const arr = [...data];
        await quickSortHelper(arr, 0, arr.length - 1);
        if (!isCancelledRef.current) setSortedIndices(arr.map((_, i) => i));
    };

    // FIX 2: mergeSortHelper cũng phải chạy tuần tự
    const mergeSortHelper = async (arr: number[], left: number, right: number) => {
        if (left >= right) return;
        const mid = Math.floor((left + right) / 2);

        // Chạy tuần tự
        await mergeSortHelper(arr, left, mid);
        await mergeSortHelper(arr, mid + 1, right);

        await merge(arr, left, mid, right);
    };

    const merge = async (arr: number[], left: number, mid: number, right: number) => {
        const mergingRange = Array.from({ length: right - left + 1 }, (_, i) => left + i);
        setMergingIndices(mergingRange);
        await pausableSleep(300);
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;
        while (i < leftArr.length && j < rightArr.length) {
            setActiveIndices([left + i, mid + 1 + j]);
            await pausableSleep(400);
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i++];
            } else {
                arr[k] = rightArr[j++];
            }
            setData([...arr]);
            await pausableSleep(400);
            k++;
        }
        while (i < leftArr.length) {
            arr[k++] = leftArr[i++];
            setData([...arr]);
            await pausableSleep(300);
        }
        while (j < rightArr.length) {
            arr[k++] = rightArr[j++];
            setData([...arr]);
            await pausableSleep(300);
        }
        setActiveIndices([]);
        setMergingIndices([]);
    };

    const runMergeSort = async () => {
        const arr = [...data];
        await mergeSortHelper(arr, 0, arr.length - 1);
        if (!isCancelledRef.current) setSortedIndices(arr.map((_, i) => i));
    };

    const startVisualization = () => {
        isCancelledRef.current = false;
        isPausedRef.current = false;
        setIsPaused(false);
        setIsSorting(true);
        resetIndices();

        const run = async () => {
            try {
                switch (algorithm) {
                    case 'bubble-sort': await runBubbleSort(); break;
                    case 'quick-sort': await runQuickSort(); break;
                    case 'merge-sort': await runMergeSort(); break;
                    default: console.warn('Thuật toán chưa được triển khai');
                }
                if (!isCancelledRef.current) {
                    setIsSorting(false);
                }
            } catch (error: any) {
                if (error.message === 'AlgorithmCancelled') {
                    console.log("Algorithm stopped by user.");
                } else {
                    console.error("An error occurred:", error);
                }
                setIsSorting(false);
                setIsPaused(false);
                isPausedRef.current = false;
            }
        };

        run();
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
                <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
                    <ArrowLeft className="h-5 w-5" />
                    <span>Quay lại Trang chủ</span>
                </Link>
            </header>
            <main className="container mx-auto py-8 flex-1">
                <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Trực quan hóa Thuật toán
                </h1>
                <div className="flex flex-wrap justify-center items-center gap-4 mb-8 p-4 bg-white rounded-lg shadow-md">
                    <Select onValueChange={setAlgorithm} defaultValue={algorithm} disabled={isSorting}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Chọn thuật toán" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bubble-sort">Bubble Sort</SelectItem>
                            <SelectItem value="quick-sort">Quick Sort</SelectItem>
                            <SelectItem value="merge-sort">Merge Sort</SelectItem>
                        </SelectContent>
                    </Select>

                    {/* --- 4. THÊM COMPONENT CHỌN TỐC ĐỘ --- */}
                    <Select onValueChange={handleSpeedChange} defaultValue={speed.toString()} disabled={isSorting}>
                        <SelectTrigger className="w-[150px]">
                            <Zap className="mr-2 h-4 w-4 text-yellow-500" />
                            <SelectValue placeholder="Chọn tốc độ" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="0.5">Rất chậm (0.5x)</SelectItem>
                            <SelectItem value="0.75">Chậm (0.75x)</SelectItem>
                            <SelectItem value="1">Bình thường (1x)</SelectItem>
                            <SelectItem value="1.5">Nhanh (1.5x)</SelectItem>
                            <SelectItem value="2">Rất nhanh (2x)</SelectItem>
                        </SelectContent>
                    </Select>

                    <Button onClick={generateNewDataAndReset} variant="outline" disabled={isSorting}>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Dữ liệu mới
                    </Button>

                    {!isSorting ? (
                        <Button onClick={startVisualization} className="w-[120px]">
                            <Play className="mr-2 h-4 w-4" />
                            Bắt đầu
                        </Button>
                    ) : isPaused ? (
                        <Button onClick={handleResume} className="w-[120px] bg-green-600 hover:bg-green-700">
                            <Play className="mr-2 h-4 w-4" />
                            Tiếp tục
                        </Button>
                    ) : (
                        <Button onClick={handlePause} className="w-[120px] bg-yellow-500 hover:bg-yellow-600">
                            <Pause className="mr-2 h-4 w-4" />
                            Tạm dừng
                        </Button>
                    )}

                    <Button onClick={handleStop} variant="destructive" disabled={!isSorting}>
                        Dừng hẳn
                    </Button>
                </div>

                {/* Phần chú thích màu sắc giữ nguyên */}
                <div className="flex justify-center items-center flex-wrap gap-x-6 gap-y-2 mb-8 p-3 bg-white rounded-lg shadow-md text-sm text-slate-700">
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{ backgroundColor: '#3b82f6' }}></div><span>Mặc định</span></div>
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{ backgroundColor: '#ef4444' }}></div><span>Đang so sánh</span></div>
                    {algorithm === 'quick-sort' && (<div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{ backgroundColor: '#f97316' }}></div><span>Chốt (Pivot)</span></div>)}
                    {algorithm === 'merge-sort' && (<div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{ backgroundColor: '#facc15' }}></div><span>Đang trộn</span></div>)}
                    <div className="flex items-center gap-2"><div className="w-4 h-4 rounded" style={{ backgroundColor: '#4ade80' }}></div><span>Đã sắp xếp</span></div>
                </div>

                <AlgorithmVisualizer
                    data={data}
                    activeIndices={activeIndices}
                    sortedIndices={sortedIndices}
                    pivotIndex={pivotIndex}
                    mergingIndices={mergingIndices}
                />
            </main>
        </div>
    );
};

export default VisualizerPage;