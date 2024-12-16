import React, { useEffect } from "react";
import JSZip from "jszip";
import Button from "./Button";
import {
  Buttons,
  Files,
  ModalContainer,
  Overlay,
  SubmitBtnContainer,
  Title,
  DownloadBinBtn,
} from "./ModalStyles";
import { apiEndpoint } from "../config";

const RunModal = ({ toggle, cluster }) => {
  const zip = new JSZip();

  useEffect(() => {
    const { fileStrings } = cluster;
    zip.file("Config.toml", fileStrings.config);
    zip.file("env.sh", fileStrings.env);
    zip.file("01_init_sequencer.sh", fileStrings["01InitSequencer"]);
    zip.file("02_run_sequencer.sh", fileStrings["02RunSequencer"]);
  }, [cluster, zip]);

  const download = () => {
    zip.generateAsync({ type: "blob" }).then((content) => {
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
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <Title>Run a Sequencer</Title>
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
            <DownloadBinBtn href={`${apiEndpoint}/sequencer/download`} download>
              Download Binary
            </DownloadBinBtn>
          </SubmitBtnContainer>
        </Buttons>
      </ModalContainer>
    </Overlay>
  );
};

export default RunModal;
