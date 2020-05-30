import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { scaleSequential } from 'd3-scale';
import { select } from 'd3-selection';
import { interpolateBlues } from 'd3-scale-chromatic';
import { interpolateRound } from 'd3-interpolate';
import { axisBottom } from 'd3-axis';

const defaultColorScale = scaleSequential()
  .domain([0, 1])
  .interpolator(interpolateBlues);

const colorRamp = (colorScale, width) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  for (let i = 0; i < width; ++i) {
    context.fillStyle = colorScale(i / (width - 1));
    context.fillRect(i, 0, 1, 40);
  }
  return canvas;
};

function Legend({
  colorScale = defaultColorScale,
  label = 'Your Label Here',
  tickSize = 6,
  width = 320,
  height = 44 + tickSize,
  marginTop = 18,
  marginRight = 0,
  marginBottom = 16 + tickSize,
  marginLeft = 0,
}) {  
  const legendRef = useRef(null);

  useEffect(() => {
    const legendSvg = select(legendRef.current);

    legendSvg.selectAll('*').remove();

    legendSvg
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height])
      .style('overflow', 'visible')
      .style('display', 'block');

    let tickAdjust = g => g.selectAll('.tick line').attr('y1', marginTop + marginBottom - height);
    const legendColorScale = Object.assign(colorScale.copy()
        .interpolator(interpolateRound(marginLeft, width - marginRight)),
        {range() { return [marginLeft, width - marginRight]; }});


    legendSvg.append('image')
        .attr('x', marginLeft)
        .attr('y', marginTop)
        .attr('width', width - marginLeft - marginRight)
        .attr('height', height)
        .attr('preserveAspectRatio', 'none')
        .attr('xlink:href', colorRamp(colorScale.interpolator(), width).toDataURL());

    legendSvg.append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(axisBottom(legendColorScale))
      .call(tickAdjust)
      .call(g => g.select('.domain').remove())
      .call(g => g.append('text')
        .attr('x', marginLeft)
        .attr('y', marginTop + marginBottom - height - 6)
        .attr('fill', 'currentColor')
        .attr('text-anchor', 'start')
        .attr('font-weight', 'bold')
        .text(label));
  }, [colorScale, height, marginBottom, label, width, tickSize]);

  return <svg ref={legendRef}></svg>;
}

export default Legend;
