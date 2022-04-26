import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.label`
  display: inline-block;
  margin: 8px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.colors.digital.blue.normal};
  border-radius: 4px;
  transition: 0.2s linear;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.decorative.light.normal};
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

type Props = {
  onLoad: (data: any) => void;
};

export const UploadSpec = ({ onLoad }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const blob = event.target.files;
    if (blob && blob[0]) {
      const reader = new FileReader();
      reader.onload = handleReaderLoad;
      reader.readAsText(blob[0]);
    }
  };
  const handleReaderLoad = (event: ProgressEvent<FileReader>) => {
    if (event.target && typeof event.target.result === 'string') {
      const json = JSON.parse(event.target.result);
      onLoad(json);
    }
  };

  return (
    <Wrapper htmlFor="upload-spec">
      <span>Upload specification</span>
      <HiddenInput
        id="upload-spec"
        type="file"
        accept="application/json"
        onChange={handleChange}
      />
    </Wrapper>
  );
};
