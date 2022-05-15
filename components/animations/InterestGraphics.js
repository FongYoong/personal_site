import { useRef } from 'react'
import dynamic from 'next/dynamic'
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), {
  ssr: false,
});

const InterestGraphics = ({className, show, progress=0}) => {

    const p5InstanceRef = useRef();
    const canvasParentRef = useRef();
    const threshold3D = 0.5;

    const setup = (p5, canvasParent) => {
        p5InstanceRef.current = p5;
        canvasParentRef.current = canvasParent;
        const width = canvasParent.offsetWidth;
        const height = canvasParent.offsetHeight;
        p5.createCanvas(width, height, p5.WEBGL).parent(canvasParent);
        //p5.frameRate(10);
    };

    const windowResized = () => {
        const width = canvasParentRef.current.offsetWidth;
        const height = canvasParentRef.current.offsetHeight;
        p5InstanceRef.current.resizeCanvas(width, height);
    };

    const draw = (p5) => {
        p5.background(0);
        if (show && progress > 0) {
            // console.log('draw graphics')
            // console.log(progress)
            const width = canvasParentRef.current.offsetWidth;
            const height = canvasParentRef.current.offsetHeight;
            function drawBox(x, y, z, scale, show3D=false) {
                p5.push();
                p5.translate(x, y, z);
                if (show3D) {
                    p5.fill(14, 235, 73, (1 - progress) / (1 - threshold3D) * 255)
                    p5.stroke(255, 3, 221);
                    p5.rotateX(p5.frameCount * 0.01);
                    p5.rotateY(p5.frameCount * 0.01);
                }
                else {
                    p5.fill(14, 235, 73)
                }
                p5.rotateZ(p5.frameCount * 0.01);
                p5.box(scale * height/7);
                p5.pop();
            }
            const scale = 0.4 + 0.6 * progress;
            if (progress > threshold3D) {
                const offset = height/5 * (progress - threshold3D) / (1 - threshold3D);
                drawBox(0, 0, 0, scale, true);
                drawBox(offset, offset, 0, scale, true);
                drawBox(-offset, -offset, 0, scale, true);
                drawBox(-offset, offset, 0, scale, true);
                drawBox(offset, -offset, 0, scale, true);
            }
            else {
                drawBox(0, 0, 0, scale);
            }
        }
    };

    return (
        <div className={className} >
            <Sketch className='w-full h-full' setup={setup} draw={draw} windowResized={windowResized} />
        </div>
    )
};

export default InterestGraphics;
