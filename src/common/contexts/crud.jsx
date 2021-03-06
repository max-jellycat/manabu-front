import React, {
  useState, useCallback,
} from 'react';
import PropTypes from 'prop-types';

import fetchJSON from 'common/utils/fetchJSON';

import useAlert from './alerts';

export const ContextProvider = ({
  url, context: Context, children, value = {},
}) => {
  const { setAlert } = useAlert();
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [filters, setFilters] = useState({});

  const setFilter = useCallback((key, value) => {
    setFilters((prevFilters) => {
      if (value) {
        return ({ ...prevFilters, [key]: value });
      }
      const newFilters = { ...prevFilters };

      delete newFilters[key];
      return (newFilters);
    });
  }, [setFilters]);

  const fetchItems = useCallback(async ({ pageIndex = 0, pageSize = 10 } = {}) => {
    const params = {
      _start: pageSize * pageIndex,
      _limit: pageSize,
      ...filters,
    };

    setIsFetching(true);
    try {
      if (pageIndex === 0) {
        const count = await fetchJSON({
          url: `${url}/count`,
          method: 'GET',
        });

        setPageCount(Math.ceil(count / pageSize));
      }

      const esc = encodeURIComponent;
      const queryParams = Object.keys(params).map((key) => `${esc(key)}=${esc(params[key])}`).join('&');

      const res = await fetchJSON({
        url: `${url}${queryParams ? '?' : ''}${queryParams}`,
        method: 'GET',
      });

      setItems(res);
      return res;
    } catch (e) {
      setAlert(e.message, 'danger');
      setError(e);
    } finally {
      setIsFetching(false);
    }
  }, [url, setAlert, filters]);

  const fetchItem = useCallback(async (id) => {
    if (!id) {
      setItem({});
      return;
    }

    setIsFetching(true);
    try {
      const res = await fetchJSON({ url: `${url}/${id}`, method: 'GET' });

      setItem(res);
      return res;
    } catch (e) {
      setAlert(e.message, 'danger');
      setError(e);
    } finally {
      setIsFetching(false);
    }
  }, [setAlert, url]);

  const save = useCallback(async (payload, shouldSetItem = false) => {
    setIsFetching(true);
    try {
      const res = await fetchJSON({ url, method: 'POST', payload });

      shouldSetItem && setItem(res);
      return res;
    } catch (e) {
      setAlert(e.message, 'danger');
      setError(e);
    } finally {
      setIsFetching(false);
    }
  }, [url, setAlert]);

  const update = useCallback(async (id, payload, shouldSetItem = false) => {
    setIsFetching(true);
    try {
      const res = await fetchJSON({ url: `${url}/${id}`, method: 'PUT', payload });

      shouldSetItem && setItem(res);
      return res;
    } catch (e) {
      setAlert(e.message, 'danger');
      setError(e);
    } finally {
      setIsFetching(false);
    }
  }, [url, setAlert]);

  const remove = useCallback(async (id) => {
    setIsFetching(true);
    try {
      await fetchJSON({ url: `${url}/${id}`, method: 'DELETE' });
    } catch (e) {
      setAlert(e.message, 'danger');
      setError(e);
    } finally {
      setIsFetching(false);
    }
  }, [url, setAlert]);

  return (
    <Context.Provider value={{
      fetchItems,
      fetchItem,
      remove,
      update,
      save,
      items,
      item,
      setItem,
      error,
      isFetching,
      pageCount,
      filters,
      setFilter,
      setFilters,
      ...value,
    }}
    >
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  url: PropTypes.string.isRequired,
  context: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired,
  value: PropTypes.object,
};

ContextProvider.defaultProps = {
  value: {},
};

export default ContextProvider;
