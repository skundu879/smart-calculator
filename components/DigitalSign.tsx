import React, { forwardRef } from 'react';

import ReactSignaturePad from 'react-signature-canvas';
import '@/style/signPad.css';

const SignaturePad = forwardRef<any, any>((props, ref) => {
  return (
    <div className='w-full h-80'>
      <ReactSignaturePad
        ref={ref}
        penColor='black'
        canvasProps={{ className: 'sigCanvas' }}
      />
    </div>
  );
});
SignaturePad.displayName = 'SignaturePad';

export default SignaturePad;
