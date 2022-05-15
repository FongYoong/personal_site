import { useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
})

const InterestMath = ({className, show, progress=0}) => {

    const p5InstanceRef = useRef();
    const canvasParentRef = useRef();

    const xSpacing = 50 * (1 - 0.6 * progress); // 50
    const ySpacing = 50 * (1 - 0.6 * progress); // 50
    const axisX = 10;
    const axisY = 10;
    const zoomThreshold = 0.4;
    //let angle = 0;

    useEffect(() => {
        if (show && progress > 0 && p5InstanceRef.current) {
            p5InstanceRef.current.redraw(1);
        }
    }, [show, progress])

    const setup = (p5, canvasParent) => {
        p5InstanceRef.current = p5;
        canvasParentRef.current = canvasParent;
        const width = canvasParent.offsetWidth;
        const height = canvasParent.offsetHeight;
        p5.createCanvas(width, height).parent(canvasParent);
        p5.stroke('rgb(207, 125, 255)');
        p5.strokeWeight(1);
        //p5.frameRate(30);
        p5.noLoop();
    };

    const windowResized = () => {
        const width = canvasParentRef.current.offsetWidth;
        const height = canvasParentRef.current.offsetHeight;
        p5InstanceRef.current.resizeCanvas(width, height);
    };

    const draw = (p5) => {
        p5.background(0);
        if (show && progress > 0) {
            const width = canvasParentRef.current.offsetWidth;
            const height = canvasParentRef.current.offsetHeight;
            const numX = Math.round(width/xSpacing);
            const numY = Math.round(height/ySpacing);

            function drawArrow(baseX, baseY, vec) {
                p5.push();
                //p5.stroke(`rgba(207, 125, 255, ${opacity})`);
                //p5.strokeWeight(1);
                // p5.fill(255, 255, 255, opacity * 255);
                p5.fill(255, 255, 255);
                p5.translate(baseX, baseY);
                const x = progress < zoomThreshold ? vec.x * progress / zoomThreshold : vec.x;
                const y = progress < zoomThreshold ? vec.y * progress / zoomThreshold : vec.y;
                p5.line(0, 0, x, y);
                p5.rotate(vec.heading());
                const arrowSize = progress < zoomThreshold ? 7 * progress / zoomThreshold : 7;
                p5.translate(Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) - arrowSize, 0);
                p5.triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
                p5.pop();
            }

            for (let i = 0; i < numY; i++) {
                for (let j = 0; j < numX; j++) {
                    const initialX = j * xSpacing;
                    const initialY = i * ySpacing;
                    const x = (initialX / width - 1/2) * axisX;
                    const y = (initialY / height - 1/2) * axisY;
                    const vec = p5.createVector(4 * (x * x - y * y - 4), 2 * (2 * x * y));
                    // drawArrow(initialX, initialY, vec, 0.2 + 0.8 * Math.abs(p5.sin(angle + i * j * p5.TWO_PI / numX / numY)));
                    drawArrow(initialX, initialY, vec);
                }
            }
            // angle += 0.03;
            // if (angle >= p5.TWO_PI) {
            //     angle = 0
            // }
        }
    };

    return (
        <div className={className} >
            <Sketch className='w-full h-full' setup={setup} draw={draw} windowResized={windowResized} />
        </div>
    )
};

export default InterestMath;
