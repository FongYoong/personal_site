import { useState, useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
// const Stage = dynamic(() => import('@inlet/react-pixi').then((mod) => mod.Stage), {
//   ssr: false,
// })
// const Graphics = dynamic(() => import('@inlet/react-pixi').then((mod) => mod.Graphics), {
//     ssr: false,
// })
import { Stage, Graphics, ParticleContainer, useApp, useTick} from '@inlet/react-pixi'
console.log(ParticleContainer)


function Arrow({x, y, vector, arrowSize}) {
    const draw = useCallback((g) => {
        console.log('bruhh')
      g.clear();
      // Line
      g.lineStyle(1, '#cf7dff', 1);
      g.moveTo(x, y);
      g.lineTo(x + vector.x, y + vector.y);

      // Triangle
      g.moveTo(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) - arrowSize, 0);
    //   p5.translate(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) - arrowSize, 0);
    //   p5.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);

    }, [x, y, vector, arrowSize]);
  
    return (
        <Graphics draw={draw} />
    )
}

const InterestMath = ({className, show, progress=0}) => {
    const parentRef = useRef();
    const [ parentDimensions, setParentDimensions ] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {
        const updateCanvasSize = () => {
            setParentDimensions({
                width: parentRef.current.clientWidth,
                height: parentRef.current.clientHeight
            })
        }
        if (parentRef.current) {
            updateCanvasSize();
        }
        window.addEventListener('resize', () => {
            updateCanvasSize();
        });
    }, [])


    const xSpacing = 50 * (1 - 0.6 * progress); // 50
    const ySpacing = 50 * (1 - 0.6 * progress); // 50
    const axisX = 10;
    const axisY = 10;
    const zoomThreshold = 0.4;
    const numX = Math.round(parentDimensions.width/xSpacing);
    const numY = Math.round(parentDimensions.height/ySpacing);
    
    let arrows = [];

    for (let i = 0; i < numY; i++) {
        for (let j = 0; j < numX; j++) {
            const initialX = j * xSpacing;
            const initialY = i * ySpacing;
            const x = (initialX / parentDimensions.width - 1/2) * axisX;
            const y = (initialY / parentDimensions.height - 1/2) * axisY;
            const vec = {
                x: 4 * (x * x - y * y - 4),
                y: 2 * (2 * x * y)
            };
            // drawArrow(initialX, initialY, vec, 0.2 + 0.8 * Math.abs(p5.sin(angle + i * j * p5.TWO_PI / numX / numY)));
            const startX = progress < zoomThreshold ? vec.x * progress / zoomThreshold : vec.x;
            const startY = progress < zoomThreshold ? vec.y * progress / zoomThreshold : vec.y;
            const arrowSize = progress < zoomThreshold ? 7 * progress / zoomThreshold : 7;
            arrows.push({
                x: startX,
                y: startY,
                vector: vec,
                arrowSize
            })
        }
    }
    // if(show && progress > 0) {
    //     console.log(arrows)
    // }
    const arrowGeometry = <Arrow />

    return (
        <div ref={parentRef} className={className} >
            <Stage width={parentDimensions.width} height={parentDimensions.height} options={{ backgroundColor: 0 }}
            
            >
                {show && progress > 0 && arrows.map((data, index) => 
                    <Graphics key={index} {...data} geometry={arrowGeometry} />
                )}
            </Stage>
        </div>
    )
};

export default InterestMath;
