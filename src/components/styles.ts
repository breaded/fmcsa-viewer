import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';


const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.05)',
  },
  table: {
    minWidth: 600, 
    '& thead th': {
      padding: theme.spacing(1),
      fontWeight: 'bold',
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.primary.light,
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&:first-child': {
        paddingLeft: 0,
      },
      '&:last-child': {
        paddingRight: 0,
      },
    },
    '& tbody tr': {
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
    '& tbody td': {
      padding: theme.spacing(1),
      color: theme.palette.text.secondary,
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&:first-child': {
        paddingLeft: 0,
      },
      '&:last-child': {
        paddingRight: 0,
      },
    },
  },
  tableSortButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(0.5),
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  tableSortIcon: {
    color: theme.palette.text.secondary,
  },
  tableFilterInput: {
    width: '100%',
    padding: theme.spacing(0.5),
    '& .MuiInputBase-root': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

export default useStyles;
