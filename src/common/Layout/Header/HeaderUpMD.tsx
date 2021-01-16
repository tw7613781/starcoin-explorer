import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import BaseRouteLink from '@/common/BaseRouteLink';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import LanguageIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { LANGUAGES_LABEL } from '@/utils/constants';
import Tabs from './Tabs';

const useStyles = (theme: Theme) => createStyles({
  header: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.getContrastText(theme.palette.background.paper),
    display: 'flex',
    flexDirection: 'column',
  },
  headerNormal: {
    height: theme.spacing(8),
  },
  headerWallet: {
    height: theme.spacing(14),
  },
  mainHeader: {
    alignItems: 'center',
    display: 'flex',
    height: theme.spacing(8),
    flex: '0 0 auto',
    flexDirection: 'row',
  },
  mainHeaderWallet: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.075)',
  },
  tabs: {
    alignItems: 'flex-end',
    display: 'flex',
    height: '100%',
  },
  title: {
    marginRight: theme.spacing(2),
  },
  pad: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  button: {
    height: theme.spacing(6),
    border: 'none',
  },
  search: {
    alignItems: 'center',
    borderTop: '1px solid rgba(0, 0, 0, 0.075)',
    display: 'flex',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  logoLink: {
    display: 'grid',
    gridGap: '10px',
    gridAutoFlow: 'column',
    alignItems: 'center',
    textDecoration: 'none',
  },
  logo: {
    fontFamily: 'Bauhaus93',
    fontSize: `${theme.spacing(6)}px`,
    color: '#3d454d',
    letterSpacing: `-${theme.spacing(2 / 4)}px`,
    textAlign: 'left',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
    lineHeight: 1,
    textTransform: 'none'
  },
  language: {
    margin: theme.spacing(0, 0.5, 0, 1),
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'block',
    },
  },
});

interface ExternalProps {
}

interface InternalProps {
  classes: any,
  t: any,
  i18n: any,
}

interface Props extends ExternalProps, InternalProps { }

interface IndexState {
  languageMenu: null | HTMLElement
}

class Index extends PureComponent<Props, IndexState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      languageMenu: null
    };
  }

  handleLanguageIconClick = (e: any) => {
    this.setState({ languageMenu: e.target });
  };

  handleLanguageMenuClose = (lang: string) => {
    this.props.i18n.changeLanguage(lang);
    this.setState({ languageMenu: null });
  };

  render() {
    const { t, i18n, classes } = this.props;
    const userLanguage = i18n.language || 'en';
    const location = window.location;
    const tabs = (
      <Tabs
        tabs={[
          {
            className: classes.button,
            id: 'blocks',
            label: t('header.blocks'),
            selected: location.pathname.startsWith('/blocks'),
            href: '/blocks',
          },
          {
            className: classes.button,
            id: 'transactions',
            label: t('header.transactions'),
            selected: location.pathname.startsWith('/transactions'),
            href: '/transactions',
          },
          //         {
          //           className: classes.button,
          //           id: 'ecosystem',
          //           label: 'Ecosystem',
          //           selected: location.pathname.startsWith('/ecosystem'),
          //           href: '/ecosystems',
          //         },
          {
            className: classes.button,
            id: 'faq',
            label: t('header.faq'),
            selected: location.pathname.startsWith('/faq'),
            href: 'faq',
          },
        ]}
      />
    );
    return (
      <div
        className={classNames({
          [classes.header]: true,
          [classes.headerNormal]: true,
        })}
      >
        <div
          className={classNames({
            [classes.mainHeader]: true,
            [classes.pad]: true,
          })}
        >
          <div className={classes.tabs}>
            <BaseRouteLink to="/" underline="none">
              <div className={classes.logoLink}>
                <Typography className={classes.logo} variant="h3">
                  Starcoin
                </Typography>
              </div>
            </BaseRouteLink>
            {tabs}
            <Tooltip title={t('header.changeLanguage')} enterDelay={300}>
              <Button
                color="inherit"
                aria-owns={this.state.languageMenu ? 'language-menu' : undefined}
                aria-haspopup="true"
                onClick={this.handleLanguageIconClick}
              >
                <LanguageIcon />
                <span className={classes.language}>
                  {LANGUAGES_LABEL.filter((language) => language.code === userLanguage)[0].text}
                </span>
                <ExpandMoreIcon fontSize="small" />
              </Button>
            </Tooltip>
            <Menu
              id="language-menu"
              anchorEl={this.state.languageMenu}
              open={Boolean(this.state.languageMenu)}
              onClose={this.handleLanguageMenuClose}
            >
              {LANGUAGES_LABEL.map((language) => (
                <MenuItem
                  key={language.code}
                  selected={userLanguage === language.code}
                  onClick={() => this.handleLanguageMenuClose(language.code)}
                >
                  {language.text}
                </MenuItem>
              ))}
            </Menu>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles)(withTranslation()(Index));
