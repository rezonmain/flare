import Countdown, { zeroPad, type CountdownRenderProps } from "react-countdown";
type FlareCountdownProps = {
  createdAt: string;
};

const rendered = ({ hours, minutes, seconds }: CountdownRenderProps) => {
  return (
    <span className="leading-7">
      {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
    </span>
  );
};

const FlareCountdown: React.FC<FlareCountdownProps> = ({ createdAt }) => {
  const ttl = new Date(createdAt).getTime() + 1000 * 60 * 60 * 24;
  return <Countdown renderer={rendered} date={ttl} />;
};

export { FlareCountdown };
