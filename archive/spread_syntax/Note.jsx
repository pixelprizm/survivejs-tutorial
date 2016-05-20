import React from 'react';

export default ({task, ...props}) => <div {...props}>{task}</div>;

// Note that if we do this, `style` is NOT passed down to the div.
// export default ({style, task, ...props}) => <div {...props}>{task} {style.color}</div>;
