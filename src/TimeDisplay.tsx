type Props = {
  minutes: string;
  seconds: string;
  milliseconds: string;
};

export const TimeDisplay = ({
  minutes,
  seconds,
  milliseconds,
}: Props) => {
  return (
    <div className="time-display">
      <span className="time-display-main">
        {minutes}
      </span>
      <span className="time-display-mark">
        '
      </span>
      <span className="time-display-main">
        {seconds}
      </span>
      <span className="time-display-mark" translate="no">
        "
      </span>
      <span className="time-display-sub">
        {milliseconds}
      </span>
    </div>
  );
};
