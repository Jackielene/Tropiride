import DriverProfileController from './DriverProfileController'
import DriverPasswordController from './DriverPasswordController'
import DriverTwoFactorAuthenticationController from './DriverTwoFactorAuthenticationController'
const Settings = {
    DriverProfileController: Object.assign(DriverProfileController, DriverProfileController),
DriverPasswordController: Object.assign(DriverPasswordController, DriverPasswordController),
DriverTwoFactorAuthenticationController: Object.assign(DriverTwoFactorAuthenticationController, DriverTwoFactorAuthenticationController),
}

export default Settings