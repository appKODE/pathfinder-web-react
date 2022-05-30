import * as React from 'react';
import { useState } from 'react';

export const TryForm = () => {
  const [value, setValue] = useState(
    'https://stoplight.io/mocks/kode-hsk/horoshkola-1/6096726/finance/v1/schedule'
  );

  const [result, setResult] = useState('');

  const onSubmitHandler = async () => {
    const data = await fetch(value, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        Authorization: 'Bearer 12322',
      },
    });

    const json = await data.json();

    setResult(json);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={onSubmitHandler}>Submit</button>

      <pre>{JSON.stringify(result, null, '\t')}</pre>
    </>
  );
};
