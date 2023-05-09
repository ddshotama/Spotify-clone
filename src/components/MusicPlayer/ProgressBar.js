import "../../styles/customize-progress-bar.css";

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }) => {
    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    return (
        <div className="progress">
            <input
                style={{ width: "100%", height: "6px", borderRadius: "16px" }}
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
            />
        </div>
    );
};

export default ProgressBar;
