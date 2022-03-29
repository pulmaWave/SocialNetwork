import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Skeleton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  breakpoints: {
    values: {
      mb: 480,
      m500: 500,
      m600: 600,
      md: 900
    }
  }
});

function Media(props) {
  const { loading = false } = props;

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          [theme.breakpoints.down('md')]: {
            mt: '80px'
          },
          [theme.breakpoints.down('m600')]: {
            mt: '65px'
          },
          [theme.breakpoints.down('mb')]: {
            mt: 'unset'
          }
        }}
      >
        <Card
          sx={{
            width: 500,
            height: 400,
            m: 2,
            [theme.breakpoints.down('m500')]: {
              width: '90vw'
            }
          }}
        >
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            action={
              loading ? null : (
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              )
            }
            title={
              <Skeleton
                animation="wave"
                height="15px"
                width="50%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          <Skeleton
            sx={{ height: 200 }}
            animation="wave"
            variant="rectangular"
          />
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Skeleton
                animation="wave"
                height="20px"
                width="90%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height="20px" width="80%" />
            </Box>
          </CardContent>
        </Card>
        <Card
          sx={{
            width: 500,
            height: 575,
            m: 2,
            [theme.breakpoints.down('m500')]: {
              width: '90vw'
            }
          }}
        >
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            action={
              loading ? null : (
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              )
            }
            title={
              <Skeleton
                animation="wave"
                height="15px"
                width="50%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          <Skeleton
            sx={{ height: 400 }}
            animation="wave"
            variant="rectangular"
          />
          <CardContent>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Skeleton
                animation="wave"
                height="20px"
                width="90%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton animation="wave" height="20px" width="80%" />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </ThemeProvider>
  );
}

Media.propTypes = {
  loading: PropTypes.bool
};

export default function Facebook() {
  return (
    <div>
      <Media loading />
    </div>
  );
}
