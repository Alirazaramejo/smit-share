import { Modal } from 'antd';
import "./css/style.scss";
import "../../mediaquery/mediaQuery.scss";
import {
  useTheme,
  downloadAll,
  uploadFile,
  useScreenWidth,
  TextArea,
  ThemeButton,
  DropZone,
  FilesList,
  useEffect,
  useState,
  db,
  ref,
  set,
  onValue,
  remove,
  LOGO,
  FILE_COLOR,
  FILE_GREY,
  TEXT_COLOR,
  TEXT_GREY,
  FaDownload,
  MdDelete,
  FiMenu,
  MdLightMode,
  MdDarkMode,
} from "../../components/index.js";
import { Link } from "react-router-dom";

function HomePage() {
  const { isDark, toggleTheme } = useTheme();
  const screenWidth = useScreenWidth();
  const [type, setType] = useState("text");
  const [textValue, setTextValue] = useState("");
  const [isText, setIsText] = useState(false);
  const [files, setFiles] = useState([]);
  const [tempFiles, setTempFiles] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onDrop = async (acceptedFiles) => {
    setTempFiles([...tempFiles, ...acceptedFiles]);
    let arr = [];
    for (var i = 0; i < acceptedFiles.length; i++) {
      arr.push(uploadFile(acceptedFiles[i], files.length + i));
    }
    const allFiles = await Promise.all(arr);
    setFiles([...files, ...allFiles]);
    set(ref(db, "file-sharing"), {
      files: [...files, ...allFiles],
    });
    setTempFiles([]);
  };

  const saveChanges = () => {
    set(ref(db, "text-sharing"), {
      text: textValue,
    });
  };

  const clearText = async () => {
    await remove(ref(db, "text-sharing"));
    setTextValue("");
    setIsText(false);
  };

  const deleteAllFiles = async () => {
    await remove(ref(db, "file-sharing"));
    setFiles([]);
  };

  useEffect(() => {
    const textRef = ref(db, "text-sharing");
    onValue(textRef, (snapshot) => {
      const data = snapshot.val();
      if (data && data.text) {
        setTextValue(data.text);
        setIsText(true);
      }
    });
    const fileRef = ref(db, "file-sharing");
    onValue(fileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setFiles(data.files);
      }
    });
  }, []);

  useEffect(() => {
    isDark
      ? document.body.classList.add("dark")
      : document.body.classList.remove("dark");
  }, [isDark]);

  var expression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  var regex = new RegExp(expression);
  const links = textValue.match(regex) || [];

  return (
    <div className={`container ${isDark ? "dark" : " "}`}>
      <div className="header-bar">
        <div className="logo">
          <img src={LOGO} alt="" />
        </div>
        <div className="menu-bar">
          {screenWidth.widthScreen > 768 ? (
            <ul>
              <li className={isDark ? "dark-text" : " "}>How it works</li>
              <li className={isDark ? "dark-text" : " "}> Download</li>
              <li className={isDark ? "dark-text" : " "}>Upgrade</li>
              <li className={isDark ? "dark-text" : " "}>Feedback</li>
              <li className="menu-btn">Login / Register</li>
              <li onClick={toggleTheme}>
                {isDark ? (
                  <MdLightMode size={24} color="white" />
                ) : (
                  <MdDarkMode size={24} />
                )}
              </li>
            </ul>
          ) : (
            <ul>
              <li onClick={toggleMenu}>
                <FiMenu size={30} />
              </li>
              <li onClick={toggleTheme}>
                {isDark ? (
                  <MdLightMode size={24} color="white" />
                ) : (
                  <MdDarkMode size={24} />
                )}
              </li>
            </ul>
          )}
          {isMenuOpen ? (
            <div className="mobile-menu">
              <ul>
                <li className={isDark ? "dark" : " "}>How it works</li>
                <li className={isDark ? "dark" : " "}> Download</li>
                <li className={isDark ? "dark" : " "}>Upgrade</li>
                <li className={isDark ? "dark" : " "}>Feedback</li>
                <li className={isDark ? "dark" : "menu-btn"}>
                  Login / Register
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>

      <div className="main-card">
        <div className={`card-sidebar ${isDark ? "dark" : " "}`}>
          {screenWidth.widthScreen <= 768 ? (
            type === "text" ? (
              <h1 className={isDark ? "dark-text" : " "}>Text</h1>
            ) : (
              <h1 className={isDark ? "dark-text" : " "}>Files</h1>
            )
          ) : null}
          <div>
            <div
              onClick={() => setType("text")}
              className={
                type === "text" ? (isDark ? "dark-light" : "active") : ""
              }
            >
              <img src={type === "text" ? TEXT_COLOR : TEXT_GREY} alt="" />
            </div>
            <div
              onClick={() => setType("files")}
              className={
                type === "files" ? (isDark ? "dark-light" : "active") : ""
              }
            >
              <img src={type === "files" ? FILE_COLOR : FILE_GREY} alt="" />
            </div>
          </div>
        </div>
        <div className={`card-container ${isDark ? "dark-light" : " "}`}>
          {type === "text" ? (
            <div className="text-section">
              {screenWidth.widthScreen > 768 ? (
                <h1 className={isDark ? "dark-light" : " "}>Text</h1>
              ) : null}
              <div className="resize-section">
                <TextArea
                  value={textValue}
                  className={isDark ? "dark-lighter" : " "}
                  onChange={(e) => {
                    setTextValue(e.target.value);
                    setIsText(false);
                  }}
                />
              </div>
              <div className="text-footer">
                <div className="links">
                  {links.map((v, i) => (
                    <div key={i}>
                      <span>
                        <a href={v} target="_blank" rel="noopener noreferrer">
                          {v}
                        </a>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="save-btn-section">
                  <span onClick={clearText}>Clear</span>
                  {isText ? (
                    <ThemeButton
                      onClick={() => {
                        navigator.clipboard.writeText(textValue);
                      }}
                      title={"Copy"}
                    />
                  ) : (
                    <ThemeButton
                      onClick={saveChanges}
                      disabled={textValue ? false : true}
                      title={"Save"}
                      className={isDark ? "dark-lighter" : " "}
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="files-section">
              <div className="files-header">
                {screenWidth.widthScreen > 768 ? (
                  <h1 className={isDark ? "dark-light" : " "}>Files</h1>
                ) : null}
                <div className="files-btn">
    <div
  onClick={() => {
    if (files.length > 0) {
      downloadAll(files);
    } else {
      // Use Ant Design Modal to display an information message.
      Modal.info({
        title: 'No Files to Download',
        content: 'There are no files to download.',
      });
    }
  }}
  className="download-btn"
>
  <FaDownload />
  Download All
</div>
                  <div onClick={deleteAllFiles} className="delete-btn">
                    <MdDelete />
                    Delete All
                  </div>
                </div>
              </div>
              {tempFiles.length || files.length ? (
                <FilesList
                  className={
                    tempFiles.length || files.length ? "fixHight" : " "
                  }
                  tempFiles={tempFiles}
                  files={files}
                  onDrop={onDrop}
                />
              ) : (
                <DropZone
                  onDrop={onDrop}
                  textElement={
                    <>
                      Drag and drop any files up to 2 files, 5Mbs each or{" "}
                      <span>Browse Upgrade</span> to get more space
                    </>
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
