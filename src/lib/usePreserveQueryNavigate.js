import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Custom hook that preserves query parameters when navigating
 */
export const usePreserveQueryNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateWithQuery = (path) => {
    // Preserve current query parameters
    const searchParams = new URLSearchParams(location.search);
    const queryString = searchParams.toString();
    const newPath = queryString ? `${path}?${queryString}` : path;
    navigate(newPath);
  };

  return navigateWithQuery;
};

