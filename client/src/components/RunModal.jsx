import Button from "./Button";
import Loader from "./Loader";
import {
  Buttons,
  Files,
  Input,
  InputContainer,
  Label,
  DownloadBinBtn,
  ModalContainer,
  Overlay,
  SelectBox,
  Step,
  StepsContainer,
  SubLabel,
  SubmitBtnContainer,
  Title,
} from "./ModalStyles";
import JSZip from "jszip";

import React, { useEffect } from "react";

const RunModal = ({ toggle, cluster }) => {
  const zip = new JSZip();

  useEffect(() => {
    zip.file("Config.toml", cluster.rollups[0].fileStrings.config);
    zip.file("env.sh", cluster.rollups[0].fileStrings.env);
    zip.file(
      "01_init_sequencer.sh",
      cluster.rollups[0].fileStrings["01InitSequencer"]
    );
    zip.file(
      "02_run_sequencer.sh",
      cluster.rollups[0].fileStrings["02RunSequencer"]
    );
  }, [cluster]);

  const download = () => {
    // Generate the zip file
    zip.generateAsync({ type: "blob" }).then(function (content) {
      // Trigger a download of the ZIP file
      const element = document.createElement("a");
      element.href = URL.createObjectURL(content);
      element.download = "run_sequencer.zip";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    });
  };

  return (
    <Overlay onClick={toggle}>
      <ModalContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Title>Run a sequencer</Title>
        <Files>
          <span>Config.toml</span>
          <span>env.sh</span>
          <span>01_init_sequencer.sh</span>
          <span>02_run_sequencer.sh</span>
          <span>sequencer.dmg</span>
        </Files>
        <Buttons>
          <SubmitBtnContainer>
            <Button onClick={download}>Download Scripts</Button>
            <DownloadBinBtn
              href="http://localhost:3333/api/v1/sequencer/download"
              download
            >
              Download Binary
            </DownloadBinBtn>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default RunModal;
