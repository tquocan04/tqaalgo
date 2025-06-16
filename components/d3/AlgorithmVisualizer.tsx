import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

// 1. Cập nhật Interface: Thêm pivotIndex
interface AlgorithmVisualizerProps {
    data: number[];
    activeIndices?: number[];
    sortedIndices?: number[];
    pivotIndex?: number | null; // <-- THÊM DÒNG NÀY
}

const AlgorithmVisualizer: React.FC<AlgorithmVisualizerProps> = ({
    data,
    activeIndices = [],
    sortedIndices = [],
    pivotIndex = null, // <-- THÊM DÒNG NÀY: Nhận prop pivotIndex
}) => {
    const ref = useRef<SVGSVGElement>(null);

    // 3. Cập nhật dependency array của useEffect
    useEffect(() => {
        if (!ref.current) return;

        const svg = d3.select(ref.current);
        const width = 500;
        const height = 300;

        svg.attr('width', width).attr('height', height);

        svg.selectAll('*').remove();

        const xScale = d3
            .scaleBand()
            .domain(data.map((_, i) => i.toString()))
            .range([0, width])
            .padding(0.2);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data) ?? 0])
            .range([height, 0]);

        svg
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (_, i) => xScale(i.toString()) ?? 0)
            .attr('y', (d) => yScale(d))
            .attr('width', xScale.bandwidth())
            .attr('height', (d) => height - yScale(d))
            // 2. Cập nhật logic tô màu
            .attr('fill', (_, i) => {
                // Ưu tiên tô màu cho pivot trước
                if (pivotIndex === i) {
                    return '#9333EA'; // Màu tím cho pivot
                }
                if (activeIndices.includes(i)) {
                    return '#F59E0B'; // Màu cam
                }
                if (sortedIndices.includes(i)) {
                    return '#10B981'; // Màu xanh lá
                }
                return 'steelblue'; // Màu mặc định
            });

        svg
            .selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text((d) => d)
            .attr('x', (_, i) => (xScale(i.toString()) ?? 0) + xScale.bandwidth() / 2)
            .attr('y', height + 15)
            .attr('text-anchor', 'middle')
            .attr('font-size', '12px')
            .attr('fill', 'black');

    }, [data, activeIndices, sortedIndices, pivotIndex]); // <-- THÊM pivotIndex VÀO ĐÂY

    return (
        <div className="flex flex-col items-center">
            <svg ref={ref}></svg>
        </div>
    );
};

export default AlgorithmVisualizer;