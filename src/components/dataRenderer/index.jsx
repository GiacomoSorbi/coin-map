import React from 'react';
import './DataRenderer.css';
import * as d3 from 'd3';
import * as d3Geo from 'd3-geo';
import worldGeoJson from './world.geo.json';

class DataRenderer extends React.Component {
  constructor(props) {
    super(props);

    this.svgElementRef = React.createRef();
  }

  componentDidMount() {
    const svgElement = this.svgElementRef.current;
    if (svgElement) {
      this.d3init(svgElement);
      this.d3render();
    }
  }

  componentDidUpdate() {
    if (this.svgElementRef.current) {
      this.d3render();
    }
  }

  componentWillUnmount() {
    if (this.svgElementRef.current) {
      this.d3destroy();
    }
  }

  render() {
    return (
      <div className="data-container">
        <svg width="100%" height="100%" ref={this.svgElementRef} />
      </div>
    );
  }

  d3init = () => {
    const svgElement = this.svgElementRef.current;

    const svg = d3.select(svgElement);
    this.svg = svg;

    const svgMainGroup = svg.append('g');
    this.svgMainGroup = svgMainGroup;

    svgMainGroup
      .append('g')
      .selectAll('path')
      .data(worldGeoJson.features)
      .enter()
      .append('path')
      .attr('class', 'd3map-region');

    svgMainGroup
      .append('path')
      .attr('class', 'd3map-graticule')
      .datum(d3Geo.geoGraticule());

    window.addEventListener('resize', this.d3render);
  };

  d3render = () => {
    const svgMainGroup = this.svgMainGroup;
    if (!svgMainGroup) {
      return;
    }

    // Get svg element size
    const svgElement = this.svgElementRef.current;
    const width = svgElement.clientWidth;
    const height = svgElement.clientHeight;

    // This represent the scale to apply to the regions and graticule
    const screenScale = (Math.min(height, width) * 1.15) / Math.PI;

    // This is a scale that can be multiplied to elements that have to be shown over the maps
    const pixelScale = screenScale / 1100;

    // The d3 geo projection and zooming transform

    const projection = d3Geo
      .geoEquirectangular()
      .scale(screenScale)
      .translate([width / 2, height / 2]);

    const geoPathProjection = d3Geo.geoPath().projection(projection);

    const zoomTransform = computeVenuesZoomTransform(
      this.props.venues,
      projection,
      width,
      height
    );

    svgMainGroup.style('stroke-width', 1.5 / zoomTransform.k);
    svgMainGroup.attr('transform', zoomTransform);

    // Update projection for regions and graticule

    svgMainGroup.selectAll('.d3map-region').attr('d', geoPathProjection);
    svgMainGroup.selectAll('.d3map-graticule').attr('d', geoPathProjection);

    // Re-render all markers

    svgMainGroup.selectAll('.d3map-marker').remove();

    svgMainGroup
      .selectAll('.d3map-marker')
      .data(this.props.venues)
      .enter()
      .append('circle')
      .attr('class', 'd3map-marker')
      .attr('cx', function(d) {
        return projection([d.lon, d.lat])[0];
      })
      .attr('cy', function(d) {
        return projection([d.lon, d.lat])[1];
      })
      .attr('r', 20 * pixelScale);
  };

  d3destroy = () => {
    window.removeEventListener('resize', this.d3render);
    this.svg = null;
    this.svgMainGroup = null;
  };
}

function computeVenuesBounds(venues, projection) {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const venue of venues) {
    const [x, y] = projection([venue.lon, venue.lat]);
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  return [[minX, minY], [maxX, maxY]];
}

function computeVenuesZoomTransform(venues, projection, width, height) {
  if (venues.length > 0) {
    const bounds = computeVenuesBounds(venues, projection);
    const dx = bounds[1][0] - bounds[0][0];
    const dy = bounds[1][1] - bounds[0][1];
    const x = (bounds[0][0] + bounds[1][0]) / 2;
    const y = (bounds[0][1] + bounds[1][1]) / 2;
    const scale = Math.max(
      1,
      Math.min(8, 0.9 / Math.max(dx / width, dy / height))
    );

    return d3.zoomIdentity
      .translate(width / 2 - scale * x, height / 2 - scale * y)
      .scale(scale);
  }
  return d3.zoomIdentity;
}

export default DataRenderer;
