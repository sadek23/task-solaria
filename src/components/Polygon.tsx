import React from 'react';

const Polygon = ({ polygons }) => {
  return (
    <svg id="uuid-59b76a1b-abe3-40a4-afca-d4837b2fbc74" viewBox="0 0 5000 5000" width="100%" height="100%">
      {polygons.map((item) => {
        const calculateCentroidX = (points) => {
          const coords = points.split(' ').map(point => point.split(',').map(Number));
          const xSum = coords.reduce((sum, [x]) => sum + x, 0);
          return coords.length ? xSum / coords.length : NaN;
        };

        const calculateCentroidY = (points) => {
          const coords = points
            .trim()
            .split(' ')
            .map(point => point.split(',').map(Number))
            .filter(coord => coord.length === 2 && !isNaN(coord[1]));

          if (coords.length === 0) {
            return NaN;
          }

          const ySum = coords.reduce((sum, [, y]) => sum + y, 0);
          return ySum / coords.length;
        };

        const centroidX = calculateCentroidX(item.points);
        const centroidY = calculateCentroidY(item.points);

        const textX = isNaN(centroidX) ? 0 : centroidX;
        const textY = isNaN(centroidY) ? 0 : centroidY;


        return (
          <React.Fragment key={item.id}>
            <polygon 
              style={{ stroke: 'black', strokeWidth: 2 }} 
              id={item.id} 
              data-code={item.dataCode} 
              points={item.points} 
              fill={item.status == "available" ? "#008000" :item.status == "sold" ?  "#FF0000" : "#FFA500"}
            />
            <text 
              x={textX} 
              y={textY} 
              textAnchor="middle" 
              fill="white"
              fontSize="12"
            >
              {item.status}
            </text>
            <text 
              x={textX} 
              y={textY + 15}
              textAnchor="middle" 
              fill="white"
              fontSize="12"
            >
              {`Price: ${item.price}`}
            </text>
          </React.Fragment>
        );
      })}
    </svg>
  );
};

export default Polygon;