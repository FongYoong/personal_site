import { useRef } from 'react'
import dynamic from 'next/dynamic'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

const InterestGraphics = ({className, progress=0}) => {

    const p5InstanceRef = useRef();
    const canvasParentRef = useRef();
    const threshold3D = 0.5;

    const setup = (p5, canvasParent) => {
        p5InstanceRef.current = p5;
        canvasParentRef.current = canvasParent;
        const width = canvasParent.offsetWidth;
        const height = canvasParent.offsetHeight;
        p5.createCanvas(width, height, p5.WEBGL).parent(canvasParent);
    };

    const windowResized = () => {
        const width = canvasParentRef.current.offsetWidth;
        const height = canvasParentRef.current.offsetHeight;
        p5InstanceRef.current.resizeCanvas(width, height);
    };

    const draw = (p5) => {
        p5.background(0);
        if (progress > 0) {
            const width = canvasParentRef.current.offsetWidth;
            const height = canvasParentRef.current.offsetHeight;
            function drawBox(x, y, z, scale) {
                p5.push();
                p5.translate(x, y, z);
                // p5.rotateX(p5.frameCount * 0.01);
                p5.rotateZ(p5.frameCount * 0.01);
                p5.box(scale * height/7);
                p5.pop();
            }
            const scale = 0.4 + 0.6 * progress;
            drawBox(0, 0, 0, scale);
            if (progress > threshold3D) {
                const offset = height/5 * (progress - threshold3D) / (1 - threshold3D);
                drawBox(offset, offset, 0, scale);
                drawBox(-offset, -offset, 0, scale);
                drawBox(-offset, offset, 0, scale);
                drawBox(offset, -offset, 0, scale);
            }
        }
    };

    return (
        <Sketch className={className} setup={setup} draw={draw} windowResized={windowResized} />
    )
};

export default InterestGraphics;
