import React, {
  useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import fetchJSON from 'common/utils/fetchJSON';
import useAlert from 'common/contexts/alerts';
import Select from '../Select/Select';

// filters: ['paramKey']

export const RemoteSelect = ({
  onDataLoaded, url, filters, processOptions, ...rest
}) => {
  const [options, setOptions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [params, setParams] = useState({});
  const { setAlert } = useAlert();

  let paramsUpdated = false;
  const newParams = {};

  filters.forEach((f) => {
    newParams[f] = rest[f];
    if (newParams[f] !== params[f]) {
      paramsUpdated = true;
    }
  });

  if (paramsUpdated) {
    setParams(newParams);
  }


  useEffect(() => {
    const fetchItems = async () => {
      setIsFetching(true);
      try {
        const esc = encodeURIComponent;
        const queryParams = Object.keys(params).map((key) => `${esc(key)}=${esc(params[key])}`).join('&');
        const res = await fetchJSON({
          url: `${url}${queryParams ? '?' : ''}${queryParams}`,
          method: 'GET',
        });

        onDataLoaded && onDataLoaded(res);

        const opts = processOptions ? processOptions(res) : res;

        setOptions(opts);
        return res;
      } catch (e) {
        setAlert(e.message, 'danger');
      } finally {
        setIsFetching(false);
      }
    };

    fetchItems();
  }, [setAlert, setIsFetching, setOptions, url, processOptions, params, onDataLoaded]);

  return (
    <Select
      options={options}
      isLoading={isFetching}
      {...rest}
    />
  );
};

RemoteSelect.propTypes = {
  url: PropTypes.string.isRequired,
  filters: PropTypes.array,
  processOptions: PropTypes.func,
  onDataLoaded: PropTypes.func,
};

RemoteSelect.defaultProps = {
  filters: [],
  processOptions: () => {},
  onDataLoaded: () => {},
};


export default RemoteSelect;
