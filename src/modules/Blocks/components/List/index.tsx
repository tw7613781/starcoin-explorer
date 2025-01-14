import React, { PureComponent } from 'react';
import { withTranslation } from 'react-i18next';
import Helmet from 'react-helmet';
import { createStyles, withStyles } from '@material-ui/core/styles';
import Loading from '@/common/Loading';
import ListView from '@/common/View/ListView';
import Pagination from '@/common/View/Pagination';
import { getNetwork } from '@/utils/helper';
import BlockTable from '../Table';

const useStyles = () => createStyles({
  pagerArea: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

interface ExternalProps {
  className?: string,
}

interface InternalProps {
  blockList: any,
  isLoadingMore: boolean,
  getBlockList: (data: any, callback?: any) => any,
  classes: any,
  t: any,
  match: any,
}

interface Props extends ExternalProps, InternalProps {}

interface IndexState {
  currentPage: number
}

class Index extends PureComponent<Props, IndexState> {
  // eslint-disable-next-line react/static-property-placement
  static defaultProps = {
    blockList: null,
    isLoadingMore: undefined,
    getBlockList: () => {}
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      currentPage: parseInt(props.match.params.page, 10) || 1,
    };
  }

  componentDidMount() {
    this.fetchListPage(this.state.currentPage);
  }

  fetchListPage = (page: number) => {
    this.props.getBlockList({ page });
  };

  pagination = (type: string) => {
    const total = this.props.blockList && this.props.blockList.hits.total.value || 0;
    if (type === 'prev' && this.state.currentPage > 1) {
      const page = this.state.currentPage - 1;
      this.props.getBlockList({ page, total }, () => { this.pagenationCallback(page); });
    } else if (type === 'next') {
      const page = this.state.currentPage + 1;
      this.props.getBlockList({ page, total }, () => { this.pagenationCallback(page); });
    }
  };

  pagenationCallback = (page: number) => {
    this.setState({ currentPage: page });
    window.history.replaceState(null, '', `/${getNetwork()}/blocks/${page}`);
  };

  render() {
    const { blockList, classes, t, className, isLoadingMore } = this.props;
    const isInitialLoad = !blockList;
    const hits = blockList && blockList.hits.hits || [];
    const blocks = hits.sort((a: any, b: any) => b._source.header.number - a._source.header.number);
    return (
      <div>
        <Helmet>
          <title>{t('header.blocks')}</title>
        </Helmet>
        <ListView
          className={className}
          title={t('header.blocks')}
          name={t('header.blocks')}
          pluralName={t('header.blocks')}
          content={
            <div>
              {isInitialLoad ? <Loading /> : <BlockTable
                blocks={blocks}
                sizeVisibleAt="xs"
                authorVisibleAt="md"
              />}
              <div className={classes.pagerArea}>
                <Pagination
                  page={this.state.currentPage}
                  pageSize={20}
                  currentPageSize={blocks == null ? null : blocks.length}
                  hasPreviousPage={this.state.currentPage > 1}
                  hasNextPage={!!true}
                  onPrevPage={() => this.pagination('prev')}
                  onNextPage={() => this.pagination('next')}
                  isLoading={isLoadingMore}
                />
              </div>
            </div>
          }
        />
      </div>
    );
  }
}

export default withStyles(useStyles)(withTranslation()(Index));
