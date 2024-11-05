import { useEffect, useState, useContext, useRef } from 'react';
import Popup from 'reactjs-popup';
import { LoginContext } from "../../utils/Contexts";
import { UploadExerciseVideo } from '../../apis/ExerciseApis';
import styles from '../../styles/PopUps/upload_popup.module.css';


const VideoPopUp = ({ exercise_id }) => {
  // Context
  const { accessToken } = useContext(LoginContext);
  // State
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(null);
    const allowedFileTypes = ["video/mp4", "video/m4v", "video/mkv", "video/webm", "video/flv", "video/avi", "video/wmv"];
    if (event.target.files.length > 0) {
      if (allowedFileTypes.includes(event.target.files[0].type)) {
        setFile(event.target.files[0]);
      } else {
        console.log("Invalid video type. Please select a valid video.");
      }
    }
  }

  const handleFileUpload = (event) => {
    UploadExerciseVideo(accessToken, exercise_id, event.target.files[0]).then((response) => {
      if (response.status == 200) {
        console.log('Video uploaded successfully');
        window.location.reload();
      } else {
        console.log(response);
      }
    });
  }

  return (
    <Popup
      trigger={
        <button className={styles.upload_button} title='Video'>
          Upload video
        </button>
      }
      modal
      nested
    >
      {close =>
        <div className={styles.modal}>
          <button className={styles.close} onClick={close}>
            &times;
          </button>
          <div className={styles.header}> Upload your video </div>
          <div className={styles.content}>
            <div className={styles.video_div}>
              <input
                id='file'
                type='file'
                accept='.mp4,.m4v,.mkv,.webm,.flv,.avi,.wmv'
                onChange={handleFileChange}
              />
              {file &&
                <button onClick={handleFileUpload}>
                  Upload
                </button>
              }
            </div>
          </div>
          <div className={styles.actions}></div>
        </div>
      }
    </Popup>
  );
}

export default VideoPopUp;
