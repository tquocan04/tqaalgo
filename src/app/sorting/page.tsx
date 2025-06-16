"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AlgorithmVisualizer from '@/components/d3/AlgorithmVisualizer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

// Hàm tiện ích
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const VisualizerPage: React.FC = () => {
    const searchParams = useSearchParams();
    const initialAlgorithm = searchParams.get('algorithm') || 'bubble-sort';

    const [data, setData] = useState<number[]>([64, 34, 25, 12, 22, 11, 90, 88]);
    const [algorithm, setAlgorithm] = useState<string>(initialAlgorithm);
    const [isSorting, setIsSorting] = useState<boolean>(false);
    const [activeIndices, setActiveIndices] = useState<number[]>([]);
    const [sortedIndices, setSortedIndices] = useState<number[]>([]);
    const [pivotIndex, setPivotIndex] = useState<number | null>(null); // <-- 1. STATE MỚI CHO PIVOT

    const resetVisualization = useCallback(() => {
        setIsSorting(false);
        setActiveIndices([]);
        setSortedIndices([]);
        setPivotIndex(null); // <-- 2. CẬP NHẬT HÀM RESET
        setData(Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 5));
    }, []);

    useEffect(() => {
        resetVisualization();
    }, [algorithm, resetVisualization]);

    // --- LOGIC BUBBLE SORT (giữ nguyên) ---
    const runBubbleSort = async () => {
        setIsSorting(true);
        let arr = [...data];
        let n = arr.length;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                setActiveIndices([j, j + 1]);
                await sleep(300);

                if (arr[j] > arr[j + 1]) {
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setData([...arr]);
                    await sleep(300);
                }
            }
            setSortedIndices((prev) => [...prev, n - 1 - i]);
        }
        setActiveIndices([]);
        setIsSorting(false);
    };

    // --- 3. LOGIC QUICK SORT MỚI ---
    const runQuickSort = async () => {
        setIsSorting(true);
        setSortedIndices([]);

        let arr = [...data];
        await quickSortHelper(arr, 0, arr.length - 1);

        setSortedIndices(arr.map((_, i) => i));
        setPivotIndex(null);
        setActiveIndices([]);
        setIsSorting(false);
    };

    const quickSortHelper = async (arr: number[], low: number, high: number) => {
        if (low < high) {
            const pi = await partition(arr, low, high);
            setSortedIndices(prev => [...prev, pi]);

            // Dùng Promise.all để chạy đệ quy trên 2 nửa "gần như" song song
            // Điều này giúp trực quan hóa trông tự nhiên hơn
            await Promise.all([
                quickSortHelper(arr, low, pi - 1),
                quickSortHelper(arr, pi + 1, high)
            ]);
        } else if (low === high) {
            setSortedIndices(prev => [...prev, low]);
        }
    };

    const partition = async (arr: number[], low: number, high: number): Promise<number> => {
        const pivot = arr[high];
        setPivotIndex(high);
        let i = low - 1;

        for (let j = low; j < high; j++) {
            setActiveIndices([j, i < low ? -1 : i]);
            await sleep(400);

            if (arr[j] < pivot) {
                i++;
                setActiveIndices([j, i, high]);
                await sleep(400);

                [arr[i], arr[j]] = [arr[j], arr[i]];
                setData([...arr]);
                await sleep(400);
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        setData([...arr]);
        setPivotIndex(null);
        await sleep(500);

        return i + 1;
    };


    const startVisualization = () => {
        setSortedIndices([]);
        setPivotIndex(null);

        // --- 4. KÍCH HOẠT QUICK SORT ---
        switch (algorithm) {
            case 'bubble-sort':
                runBubbleSort();
                break;
            case 'quick-sort': // <-- Thêm case
                runQuickSort();
                break;
            default:
                console.warn('Thuật toán chưa được triển khai');
        }
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
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Chọn thuật toán" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="bubble-sort">Bubble Sort</SelectItem>
                            {/* Mở khóa Quick Sort */}
                            <SelectItem value="quick-sort">Quick Sort</SelectItem>
                            <SelectItem value="merge-sort" disabled>Merge Sort (sắp ra mắt)</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button onClick={resetVisualization} variant="outline" disabled={isSorting}>
                        Tạo dữ liệu ngẫu nhiên
                    </Button>
                    <Button onClick={startVisualization} disabled={isSorting}>
                        {isSorting ? 'Đang chạy...' : 'Bắt đầu'}
                    </Button>
                </div>
                {/* 5. TRUYỀN PROP pivotIndex XUỐNG */}
                <AlgorithmVisualizer
                    data={data}
                    activeIndices={activeIndices}
                    sortedIndices={sortedIndices}
                    pivotIndex={pivotIndex}
                />
            </main>
        </div>
    );
};

export default VisualizerPage;