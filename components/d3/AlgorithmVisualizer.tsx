// src/components/d3/AlgorithmVisualizer.tsx

"use client";

import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// 1. Định nghĩa kiểu dữ liệu cho các props mà component sẽ nhận
interface AlgorithmVisualizerProps {
    data: number[];
    activeIndices: number[];
    sortedIndices: number[];
    pivotIndex: number | null;
    mergingIndices: number[];
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
    data,
    activeIndices,
    sortedIndices,
    pivotIndex,
    mergingIndices,
}) => {
    // useRef để tham chiếu đến thẻ SVG trong DOM
    const svgRef = useRef<SVGSVGElement | null>(null);

    // useEffect sẽ chạy mỗi khi có sự thay đổi trong dữ liệu hoặc các chỉ số
    useEffect(() => {
        if (!svgRef.current || data.length === 0) return;

        // --- Cấu hình SVG và biểu đồ ---
        const svg = d3.select(svgRef.current);
        const parent = svg.node()?.parentElement;
        if (!parent) return;

        // Lấy kích thước từ container cha để biểu đồ có thể co giãn
        const width = parent.clientWidth;
        const height = 400; // Chiều cao cố định
        const margin = { top: 40, right: 20, bottom: 30, left: 20 };

        svg.attr("width", width).attr("height", height);

        // Xóa toàn bộ nội dung cũ của SVG trước khi vẽ lại
        svg.selectAll("*").remove();

        // Gán một group <g> để dễ dàng áp dụng margin
        const chart = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // --- Định nghĩa các Thang đo (Scales) ---

        // Thang đo trục X: Dùng cho vị trí các thanh, chia đều không gian
        const xScale = d3
            .scaleBand()
            .domain(data.map((_, i) => i.toString())) // Domain là các chỉ số của mảng
            .range([0, chartWidth])
            .padding(0.25); // Khoảng cách giữa các thanh

        // Thang đo trục Y: Dùng cho chiều cao các thanh
        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data) || 100]) // Domain là từ 0 đến giá trị lớn nhất
            .range([chartHeight, 0]); // Range bị đảo ngược vì tọa độ SVG bắt đầu từ trên xuống

        // --- Vẽ các Thanh (Bars) ---
        chart
            .selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", (d, i) => xScale(i.toString())!)
            .attr("y", (d) => yScale(d))
            .attr("width", xScale.bandwidth())
            .attr("height", (d) => chartHeight - yScale(d))
            .attr("rx", 4) // Bo góc
            // --- Logic tô màu động ---
            .attr("fill", (d, i) => {
                // Ưu tiên 1: Đã sắp xếp xong
                if (sortedIndices.includes(i)) {
                    return "#4ade80"; // Xanh lá cây
                }
                // Ưu tiên 2: Là chốt của Quick Sort
                if (pivotIndex === i) {
                    return "#f97316"; // Cam
                }
                // Ưu tiên 3: Nằm trong mảng con đang được trộn của Merge Sort
                if (mergingIndices.includes(i)) {
                    return "#facc15"; // Vàng
                }
                // Ưu tiên 4: Đang được so sánh hoặc hoán đổi
                if (activeIndices.includes(i)) {
                    return "#ef4444"; // Đỏ
                }
                // Mặc định
                return "#3b82f6"; // Xanh dương
            })
            .transition() // Thêm hiệu ứng chuyển động mượt mà
            .duration(300);

        // --- Vẽ các Nhãn (Labels - giá trị của thanh) ---
        chart
            .selectAll(".label")
            .data(data)
            .enter()
            .append("text")
            .attr("class", "label")
            .text((d) => d)
            .attr("x", (d, i) => xScale(i.toString())! + xScale.bandwidth() / 2)
            .attr("y", (d) => yScale(d) - 8) // Hiển thị phía trên thanh 8px
            .attr("text-anchor", "middle")
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("font-weight", "bold")
            .attr("fill", "#334155"); // Màu xám đậm

    }, [data, activeIndices, sortedIndices, pivotIndex, mergingIndices]); // Dependency array

    return (
        <div className="w-full bg-white rounded-lg shadow-xl border p-4">
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default AlgorithmVisualizer;