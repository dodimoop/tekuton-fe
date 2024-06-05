import { SxProps, Theme } from "@mui/material";

const BoxWrapperStyle: SxProps<Theme> = {
  alignItems: "center",
  display: "flex",
  padding: 3,
};

const ChipStyle: SxProps<Theme> = {
  backgroundColor: "#13C77F",
  color: "#F0F6FC",
  fontSize: "14px",
  fontWeight: "600",
  ml: "35px",
  position: "absolute",
  top: "-10px",
  zIndex: "1",
};

const ChipStyleInactive: SxProps<Theme> = {
  backgroundColor: "#d3d8dc",
  color: "#F0F6FC",
  fontSize: "14px",
  fontWeight: "600",
  ml: "35px",
  position: "absolute",
  top: "-10px",
  zIndex: "1",
};

const ContainerStyle: SxProps<Theme> = {
  "& .middle": {
    opacity: 1,
  },
  "&:hover": {
    "& .avatar": {
      cursor: "pointer",
      opacity: "0.5",
    },
  },
  borderColor: "#13C77F",
  borderRadius: "50%",
  borderStyle: "solid",
  borderWidth: "4px",
  padding: "3px",
  position: "relative",
  width: 145,
};

const ContainerStyleInactive: SxProps<Theme> = {
  "& .middle": {
    opacity: 1,
  },
  "&:hover": {
    "& .avatar": {
      cursor: "pointer",
      opacity: "0.5",
    },
  },
  borderColor: "#d3d8dc",
  borderRadius: "50%",
  borderStyle: "solid",
  borderWidth: "4px",
  padding: "3px",
  position: "relative",
  width: 145,
};

const MiddleStyle: SxProps<Theme> = {
  MozTransformOrigin: "translate(-50%, -50%)",
  left: "50%",
  opacity: 0,
  position: "absolute",
  textAlign: "center",
  top: "50%",
  transform: "translate(-50%, -50%)",
  transition: ".5s ease",
};

const ProfileStyle: SxProps<Theme> = {
  display: "flex",
  backfaceVisibility: "hidden",
  height: 130,
  opacity: 1,
  transition: ".5s ease",
  width: 130,
};

const RoleAndJoinStyle: SxProps<Theme> = {
  color: "#ABADBA",
  fontSize: 12,
  fontWeight: 400,
  lineHeight: "16px",
  mb: "12px",
};

const LastLoginStyle: SxProps<Theme> = {
  color: "#ABADBA",
  fontSize: 12,
  fontWeight: 400,
  lineHeight: "16px",
};

const RoleAndJoinValueStyle: SxProps<Theme> = {
  color: "#72768D",
  fontSize: 12,
  fontWeight: 700,
  lineHeight: "16px",
  mb: "12px",
};

const LastLoginValueStyle: SxProps<Theme> = {
  color: "#72768D",
  fontSize: 12,
  fontWeight: 700,
  lineHeight: "16px",
};

const ToggleStyle: SxProps<Theme> = { ml: -1.5 };

export {
  BoxWrapperStyle,
  ChipStyle,
  ChipStyleInactive,
  ContainerStyle,
  ContainerStyleInactive,
  LastLoginStyle,
  LastLoginValueStyle,
  MiddleStyle,
  ProfileStyle,
  RoleAndJoinStyle,
  RoleAndJoinValueStyle,
  ToggleStyle,
};
