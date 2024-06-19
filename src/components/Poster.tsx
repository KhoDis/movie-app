import { ShortImage } from "../redux/api.ts";
import { CardMedia, Stack } from "@mui/material";
import { BrokenImage } from "@mui/icons-material";

export function Poster(props: { poster: ShortImage }) {
  return <>
    {props.poster ? (
      <CardMedia
        component="img"
        image={props.poster.previewUrl}
        sx={{ height: 400 }}
      />
    ) : (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: 400 }}
      >
        <BrokenImage fontSize="large" />
        No available preview
      </Stack>
    )}
  </>;
}