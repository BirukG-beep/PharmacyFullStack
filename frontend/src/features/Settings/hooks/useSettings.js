import { useSelector, useDispatch } from 'react-redux';
import {
  updateDisplaySettings,
  updateNotificationSettings,
  updatePrivacySettings,
  updateAccountSettings,
  updateGeneralPreferences,
} from '../../../Reducer/settingSlice';

export const useSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector((state) => state.settings);

  const updateDisplay = (data) => {
    dispatch(updateDisplaySettings(data));
  };

  const updateNotification = (data) => {
    dispatch(updateNotificationSettings(data));
  };

  const updatePrivacy = (data) => {
    dispatch(updatePrivacySettings(data));
  };

  const updateAccount = (data) => {
    dispatch(updateAccountSettings(data));
  };

  const updatePreferences = (data) => {
    dispatch(updateGeneralPreferences(data));
  };

  return {
    settings,
    updateDisplay,
    updateNotification,
    updatePrivacy,
    updateAccount,
    updatePreferences,
  };
};