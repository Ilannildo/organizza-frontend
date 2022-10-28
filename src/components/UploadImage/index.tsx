import { Avatar, Box, Typography, useTheme } from "@mui/material";
import { Upload } from "phosphor-react";
import Dropzone from "react-dropzone";

const MESSAGE_COLORS = {
  default: "#999",
  error: "#e57878",
  success: "#78e5d5",
};

interface IUploadImage {
  onUpload: <T extends File>(files: T[]) => void;
  error: string;
}

export const UploadImage = ({ onUpload, error }: IUploadImage) => {
  const theme = useTheme();

  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if (!isDragActive) {
      return (
        <Typography
          component="h1"
          variant="h6"
          fontWeight={600}
          sx={{
            color: MESSAGE_COLORS.default,
            fontSize: 18,
          }}
        >
          Clique ou arraste e solte aqui
        </Typography>
      );
    }
    if (isDragReject) {
      return (
        <Typography
          component="h1"
          variant="h6"
          fontWeight={600}
          sx={{
            color: MESSAGE_COLORS.error,
            fontSize: 18,
          }}
        >
          Arquivo não suportado
        </Typography>
      );
    }

    return (
      <Typography
        component="h1"
        variant="h6"
        fontWeight={600}
        sx={{
          color: MESSAGE_COLORS.success,
          fontSize: 18,
        }}
      >
        Solte a imagem aqui
      </Typography>
    );
  };

  return (
    <Dropzone
      accept={{ "image/png": [], "image/jpg": [], "image/jpeg": [] }}
      multiple={false}
      onDropAccepted={(acceptedFiles) => onUpload(acceptedFiles)}
    >
      {({ getInputProps, getRootProps, isDragActive, isDragReject }) => (
        <>
          <Box
            {...getRootProps()}
            sx={{
              border: "1px dashed #ddd",
              borderColor:
                error !== " "
                  ? MESSAGE_COLORS.error
                  : isDragReject
                  ? MESSAGE_COLORS.error
                  : isDragActive
                  ? MESSAGE_COLORS.success
                  : MESSAGE_COLORS.default,
              p: 3,
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              transition: "height 0.2s ease",
            }}
          >
            <input {...getInputProps()} />
            <Avatar
              variant="circular"
              sx={{
                backgroundColor: "rgba(25, 118,210,.12)",
              }}
            >
              <Upload color={theme.palette.primary.main} />
            </Avatar>
            {renderDragMessage(isDragActive, isDragReject)}
            <Typography
              component="h1"
              variant="h6"
              mb={2}
              sx={{
                fontSize: 12,
                color: MESSAGE_COLORS.default,
              }}
            >
              PNG, JPG ou GIF (max. 3MB)
            </Typography>
          </Box>
          {error !== " " && (
            <Typography
              component="h1"
              variant="h6"
              mb={1}
              sx={{
                color: (theme) => theme.palette.error.main,
                fontSize: 12,
                fontWeight: 400,
              }}
            >
              {error}
            </Typography>
          )}
        </>
      )}
    </Dropzone>
  );
};
