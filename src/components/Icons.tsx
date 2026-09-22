import Svg, { Circle, Line, Path, Rect } from "react-native-svg";

type IconProps = { size?: number; color?: string };

export const IGrid = ({ size = 20, color = "#fff" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
  </Svg>
);

export const IMonitor = ({ size = 20, color = "#fff" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
  >
    <Rect x="2" y="3" width="20" height="14" rx="2" />
    <Path d="M8 21h8M12 17v4" />
  </Svg>
);

export const IBell = ({ size = 20, color = "#fff" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2a7 7 0 0 1 7 7v3.586l1.707 1.707A1 1 0 0 1 20 16H4a1 1 0 0 1-.707-1.707L5 12.586V9a7 7 0 0 1 7-7zm0 20a3 3 0 0 1-2.83-2h5.66A3 3 0 0 1 12 22z" />
  </Svg>
);

export const IUser = ({ size = 20, color = "#fff" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </Svg>
);

export const ICheck = ({ size = 16, color = "#fff" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M5 13l4 4L19 7" />
  </Svg>
);

export const IWarn = ({ size = 16, color = "#fff" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2L1 21h22L12 2zm0 3.5L20.5 19h-17L12 5.5zm-1 5.5v4h2v-4h-2zm0 6v2h2v-2h-2z" />
  </Svg>
);

export const IDanger = ({ size = 16, color = "#fff" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
  </Svg>
);

export const IRun = ({ size = 16, color = "#fff" }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Circle cx="13" cy="4" r="2" />
    <Path d="m6 20 4-4 2 2 5-6-3.5-.5L16 8l-3 1-1.5 3-3 1L6 20z" />
  </Svg>
);

export const IEye = ({ size = 16, color = "#fff" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.8}
    strokeLinecap="round"
  >
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <Circle cx="12" cy="12" r="3" />
  </Svg>
);

export const IEyeOff = ({ size = 16, color = "#fff" }: IconProps) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.8}
    strokeLinecap="round"
  >
    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <Line x1="1" y1="1" x2="23" y2="23" strokeWidth={1.8} />
  </Svg>
);

export const IChevron = ({
  size = 16,
  color = "#fff",
  open,
}: IconProps & { open: boolean }) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }}
  >
    <Path d="M6 9l6 6 6-6" />
  </Svg>
);

export const LogoMark = ({ size = 60 }: { size?: number }) => (
  <Svg width={size} height={(size * 72) / 64} viewBox="0 0 64 72" fill="none">
    <Path
      d="M32 2L4 14v22c0 16.6 11.9 32.1 28 36 16.1-3.9 28-19.4 28-36V14L32 2z"
      fill="#1A0000"
      stroke="#D91C1C"
      strokeWidth={2}
    />
    <Path
      d="M32 12L10 22v16c0 12 8.5 23.2 22 26.5C45.5 61.2 54 50 54 38V22L32 12z"
      fill="rgba(217,28,28,0.15)"
    />
    <Path
      d="M22 36l7 7 13-13"
      stroke="#D91C1C"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
