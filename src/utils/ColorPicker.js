import React, { useState } from 'react';
import Colorful from '@uiw/react-color-colorful';
import { hsvaToHex } from '@uiw/color-convert';

export default function Demo() {
  const [hexa, seHexa] = useState(null);
  return (
    <>
      <Colorful
        color={hexa}
        onChange={(color) => {
          setHex(hsvaToHex(color.hsva));
        }}
      />
      <div style={{ background: hexa, marginTop: 30, padding: 10 }}>
        {JSON.stringify(hexa)}
      </div>
    </>
  );
}