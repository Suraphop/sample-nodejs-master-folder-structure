const AuthenticationRepository = require("../repositories/authentication.repository");
const JTW = require("../middlewares/jwt");
const bcrypt = require("bcrypt");

class AuthenticationService {
  /*
    A class to represent a authenication permission.

    Attributes:
        -

    Methods:
        signup(data):
            sign up with emp_no, email, password, role_id, level_id, division_id.
        
        checkDuplicateEmpNo(emp_no):
            check duplicate emp no is already used or not ?
        
        checkDuplicateEmail(emp_no):
            check duplicate email is already used or not ?
        
        assignRole(data):
            assign role of emp no.

        acceptSignup(data):
           accept user that signup.

        checkMatchUser(emp_no):
            check matching emp no.

        checkMatchPassword(emp_no, password):
            check matching password.

        logIn(data):
            login and create token.

        changePassword(data):
            change new password with emp no and old password.
          
        deleteAccount(auth_id):
            delete account with auth id.

        getAllAccount(auth_id):
            get all account.        
  */

  async signUp(data) {
    /*
        sign up with emp_no, email, password, role_id, level_id, division_id

        Args:
            emp_no (string): The employee number.
            email (string): The email.
            password (string): The password.
            role_id (int): The role id.
            level_id (int): The level id.
            division_id (int): The division id.

        Raises:
            ValueError: If the role_id or level_id or division_id not found.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.signUp("J6639", "suraphop.b@minebea.co.th", "password", 1, 1, 1)
            sign up success: J6639
            */
    try {
      await AuthenticationRepository.add(data);
      return `sign up success: ${data.emp_no}`;
    } catch (error) {
      if (error.name.includes("SequelizeForeignKeyConstraintError")) {
        throw "sign up error: role_id or level_id or division_id not found";
      }
      throw `sign up error: ${error}`;
    }
  }

  async checkDuplicateEmpNo(emp_no) {
    /*
        check duplicate emp no is already used or not ?

        Args:
            emp_no (string): The employee number.

        Raises:
            ValueError: If the emp_no is already exited.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.checkDuplicateEmpNo("J6639")
            null
    */
    const get_emp_no = await AuthenticationRepository.getIDByEmpNo(
      emp_no.toLowerCase()
    );
    if (get_emp_no) {
      throw `Duplicate emp no Error: ${emp_no} is already exited`;
    }
  }

  async checkDuplicateEmail(email) {
    /*
        check duplicate email is already used or not ?

        Args:
            email (string): The email.

        Raises:
            ValueError: If the email is already exited.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.checkDuplicateEmail("suraphop.b@minebea.co.th")
            null
    */
    const get_email = await AuthenticationRepository.getEmail(email);
    if (get_email) {
      throw `Duplicate email Error: ${email} is already exited`;
    }
  }

  async assignRole(data) {
    /*
        assign role of emp no

        Args:
            auth_id (int): The authentication id.
            role_id (int): The role id.

        Raises:
            ValueError: If the role_id not found.
            ValueError: If the auth_id not found.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.assignRole(1,1)
            assign role success
    */
    const updates = { role_id: data.role_id };
    try {
      await AuthenticationRepository.update(data.auth_id, updates);
      return `assign role success`;
    } catch (error) {
      if (error.name.includes("SequelizeForeignKeyConstraintError")) {
        throw "assign role error: role_id not found";
      }
      if (error.name.includes("TypeError")) {
        throw "assign role error: auth_id not found";
      }
      throw `assign role error: ${error}`;
    }
  }

  async acceptSignup(data) {
    /*
        accept user that signup

        Args:
            auth_id (int): The authentication id.

        Raises:
            ValueError: If the auth_id not found.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.acceptSignup(1)
            accept sign up success
    */
    const updates = { signup_status: "activate" };
    try {
      await AuthenticationRepository.update(data.auth_id, updates);
      return `accept sign up success`;
    } catch (error) {
      throw `accept sign up error: ${error}`;
    }
  }

  async checkMatchUser(emp_no) {
    /*
        check matching emp no

        Args:
            emp_no (string): The employee number.

        Raises:
            ValueError: If the emp_no is not found.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.checkMatchUser("J6639")
            null
    */
    const password = await AuthenticationRepository.getIDByEmpNo(emp_no);
    if (!password) {
      throw `login error: ${emp_no} is not found`;
    }
  }

  async checkMatchPassword(emp_no, password) {
    /*
        check matching password

        Args:
            emp_no (string): The employee number.
            password (string): The password.

        Raises:
            ValueError: If the password is wrong.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.checkMatchPassword("J6639", "password")
            null
    */
    const hash_password = await AuthenticationRepository.getPasswordByEmpNo(
      emp_no
    );
    // Check if the password is correct
    const passwordIsMatch = await bcrypt.compare(
      password,
      hash_password.password
    );
    if (!passwordIsMatch) {
      throw `login error: password is wrong with ${emp_no}`;
    }
  }

  async logIn(data) {
    /*
        login and create token

        Args:
            emp_no (string): The employee number.
            password (string): The password.

        Raises:
            ValueError: If the emp_no is not found.
            ValueError: If the password is wrong.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.logIn("J6639", "password")
            token
    */
    try {
      const role = await AuthenticationRepository.getRoleByEmpNo(data.emp_no);
      const level = await AuthenticationRepository.getLevelByEmpNo(data.emp_no);
      return await JTW.createToken(data.emp_no, role.role, level.level);
    } catch (error) {
      throw `login error: ${error}`;
    }
  }

  async changePassword(data) {
    /*
        change new password with emp no and old password

        Args:
            emp_no (string): The employee number.
            old_password (string): The old password.
            new_password (string): The new password.

        Raises:
            ValueError: If the emp_no is not found.
            ValueError: If the old password is wrong.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.changePassword("J6639", "password", "new_password")
            change password successful
    */
    const updates = { password: data.new_password };
    try {
      const auth_id = await AuthenticationRepository.getIDByEmpNo(data.emp_no);
      await AuthenticationRepository.update(auth_id.auth_id, updates);
      return `change password successful`;
    } catch (error) {
      throw `change password error: ${error}`;
    }
  }

  async deleteAccount(auth_id) {
    /*
        delete account with auth id

        Args:
            auth_id (int): The authentication id.

        Raises:
            ValueError: If the auth_id is not found.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.deleteAccount(1)
            delete account successful
    */
    try {
      await AuthenticationRepository.delete(auth_id);
      return `delete account successful`;
    } catch (error) {
      throw `delete account error: ${error}`;
    }
  }

  async getAllAccount(auth_id) {
    /*
        get all account

        Args:
            auth_id (int): The authentication id.

        Raises:
            ValueError: If the auth_id is not found.
        
        Example:
            >>> authen = AuthenticationService()
            >>> authen.getAllAccount(1)
            [
                {
                    "auth_id": 1,
                    "emp_no": "J6639",
                    "password" : "password",
                    "email": "suraphop.b@minebea.co.th",
                    "signup_status": "deactivate",
                }
            ]
    */

    try {
      return await AuthenticationRepository.getAll();
    } catch (error) {
      throw `get all account error: ${error}`;
    }
  }
}

module.exports = new AuthenticationService();
