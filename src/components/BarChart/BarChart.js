import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function BarChart({ width, height, data }) {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "2px solid #FF6FB5")
            .style("border-radius", "5px")
    }, []);

    useEffect(() => {
        draw();
    }, [data]);

    const draw = () => {

        const svg = d3.select(ref.current);
        var selection = svg.selectAll("rect").data(data);
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, height - 100]);

        selection
            .transition().duration(300)
            .attr("height", (d) => yScale(d))
            .attr("y", (d) => height - yScale(d))

        selection
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 45)
            .attr("y", (d) => height)
            .attr("width", 40)
            .attr("height", 0)
            .attr("fill", "white")
            .transition().duration(300)
            .attr("height", (d) => yScale(d))
            .attr("y", (d) => height - yScale(d))

        selection
            .exit()
            .transition().duration(300)
            .attr("y", (d) => height)
            .attr("height", 0)
            .remove()
    }


    return (
        <div className="chart">
            <svg className='innerbox' ref={ref}>
            </svg>
        </div>

    )

}

export default BarChart;