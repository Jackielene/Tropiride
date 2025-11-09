import AdminProfileController from './AdminProfileController'
import AdminPasswordController from './AdminPasswordController'
import AdminTwoFactorAuthenticationController from './AdminTwoFactorAuthenticationController'
const Settings = {
    AdminProfileController: Object.assign(AdminProfileController, AdminProfileController),
AdminPasswordController: Object.assign(AdminPasswordController, AdminPasswordController),
AdminTwoFactorAuthenticationController: Object.assign(AdminTwoFactorAuthenticationController, AdminTwoFactorAuthenticationController),
}

export default Settings