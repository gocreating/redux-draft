import React from 'react';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import './TeX.css';

let TeX = ({ math, ...rest }) => (
  <div className="rd tex">
    <BlockMath
      math={math.replace(/\n/g, ' ')}
      {...rest}
    />
  </div>
);

export default TeX;
