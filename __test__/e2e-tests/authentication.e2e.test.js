const request = require("supertest");
const app = require("../../app");
const db = require("../../app/models");
const Authentication = db.authenication;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("End-to-End Tests for signup API", () => {
  it("should create a new user via POST /signup", async () => {
    //Create : Data for create new user
    const Data = {
      emp_no: "E5130",
      password: "password",
      repassword: "password",
      email: "ewfwe01@minebea.co.th",
      role_id: 1,
      level_id: 1,
      division_id: 1,
    };

    // Act: Send a POST request to create a new user
    const response = await request(app)
      .post("/api/v1/authen/signup")
      .send(Data);

    // Assert: Verify the response status and the user data in the response
    expect(response.status).toBe(201);
    expect(response.body.result).toBe(
      `sign up success: ${Data.emp_no.toLowerCase()}`
    );

    // Verify the user is saved in the database
    const userInDb = await Authentication.findOne({
      where: { emp_no: Data.emp_no.toLowerCase() },
    });
    expect(userInDb).not.toBeNull();
    expect(userInDb.emp_no).toBe(Data.emp_no.toLowerCase());
    expect(userInDb.email).toBe(Data.email);
    expect(userInDb.signup_status).toBe("deactivate");
    expect(userInDb.role_id).toBe(Data.role_id);
    expect(userInDb.level_id).toBe(Data.level_id);
    expect(userInDb.division_id).toBe(Data.division_id);
    expect(await bcrypt.compare(Data.password, userInDb.password)).toBe(true);
  });

  it("should return 500 for invalid no data POST /signup", async () => {
    // Act: Send a POST request with missing required fields
    const response = await request(app).post("/api/v1/authen/signup").send({}); // Empty payload (missing name and email)
    // Assert: Check that the response returns a 500 error
    expect(response.status).toBe(500);
    expect(response.body.result).toEqual(
      'Validation Error: "emp_no" is required'
    );
  });

  it("should return 500 for invalid POST no have password /signup", async () => {
    // Create : Data for create new user
    const Data = {
      emp_no: "E5130",
      repassword: "password",
      email: "ewfwe01@minebea.co.th",
      role_id: 1,
      level_id: 1,
      division_id: 1,
    };

    // Act: Send a POST request with missing required fields
    const response = await request(app)
      .post("/api/v1/authen/signup")
      .send(Data); // Empty payload (missing name and email)
    // Assert: Check that the response returns a 500 error
    expect(response.status).toBe(500);
    expect(response.body.result).toEqual(
      'Validation Error: "password" is required'
    );
  });

  it("should return 500 for invalid POST no have re password /signup", async () => {
    // Create : Data for create new user
    const Data = {
      emp_no: "E5130",
      password: "password",
      email: "ewfwe01@minebea.co.th",
      role_id: 1,
      level_id: 1,
      division_id: 1,
    };

    // Act: Send a POST request with missing required fields
    const response = await request(app)
      .post("/api/v1/authen/signup")
      .send(Data); // Empty payload (missing name and email)
    // Assert: Check that the response returns a 500 error
    expect(response.status).toBe(500);
    expect(response.body.result).toEqual(
      'Validation Error: "repassword" is required'
    );
  });

  it("should return 500 for invalid POST no have email /signup", async () => {
    // Create : Data for create new user
    const Data = {
      emp_no: "E5130",
      password: "password",
      re_password: "password",
      role_id: 1,
      level_id: 1,
      division_id: 1,
    };

    // Act: Send a POST request with missing required fields
    const response = await request(app)
      .post("/api/v1/authen/signup")
      .send(Data); // Empty payload (missing name and email)
    // Assert: Check that the response returns a 500 error
    expect(response.status).toBe(500);
    expect(response.body.result).toEqual(
      'Validation Error: "email" is required'
    );
  });

  it("should return 500 for invalid POST role_id not found /signup", async () => {
    // Create : Data for create new user
    const Data = {
      emp_no: "E5131",
      password: "password",
      repassword: "password",
      email: "ewfwe02@minebea.co.th",
      role_id: 9999,
      level_id: 1,
      division_id: 1,
    };

    // Act: Send a POST request with missing required fields
    const response = await request(app)
      .post("/api/v1/authen/signup")
      .send(Data); // Empty payload (missing name and email)
    // Assert: Check that the response returns a 500 error
    expect(response.status).toBe(500);
    expect(response.body.result).toBe(
      "sign up error: role_id or level_id or division_id not found"
    );
  });

  it("should return 500 for invalid POST level_id not found /signup", async () => {
    // Create : Data for create new user
    const Data = {
      emp_no: "E5131",
      password: "password",
      repassword: "password",
      email: "ewfwe02@minebea.co.th",
      role_id: 1,
      level_id: 9999,
      division_id: 1,
    };

    // Act: Send a POST request with missing required fields
    const response = await request(app)
      .post("/api/v1/authen/signup")
      .send(Data); // Empty payload (missing name and email)
    // Assert: Check that the response returns a 500 error
    expect(response.status).toBe(500);
    expect(response.body.result).toMatch(
      "sign up error: role_id or level_id or division_id not found"
    );
  });

  it("should return 500 for invalid POST division_id not found /signup", async () => {
    // Create : Data for create new user
    const Data = {
      emp_no: "E5131",
      password: "password",
      repassword: "password",
      email: "ewfwe02@minebea.co.th",
      role_id: 1,
      level_id: 1,
      division_id: 9999,
    };

    // Act: Send a POST request with missing required fields
    const response = await request(app)
      .post("/api/v1/authen/signup")
      .send(Data); // Empty payload (missing name and email)
    // Assert: Check that the response returns a 500 error
    expect(response.status).toBe(500);
    expect(response.body.result).toMatch(
      "sign up error: role_id or level_id or division_id not found"
    );
  });

  it("should return 500 for invalid POST emp no duplicate /signup", async () => {
    // Create : Data for create new user
    const Data = {
      emp_no: "E5130",
      password: "password",
      repassword: "password",
      email: "ewfwe02@minebea.co.th",
      role_id: 1,
      level_id: 1,
      division_id: 9999,
    };

    // Act: Send a POST request with missing required fields
    const response = await request(app)
      .post("/api/v1/authen/signup")
      .send(Data); // Empty payload (missing name and email)
    // Assert: Check that the response returns a 500 error
    expect(response.status).toBe(500);
    expect(response.body.result).toEqual(
      `Duplicate emp no Error: ${Data.emp_no} is already exited`
    );
  });

  it("should return 500 for invalid POST email duplicate /signup", async () => {
    // Create : Data for create new user
    const Data = {
      emp_no: "E5131",
      password: "password",
      repassword: "password",
      email: "ewfwe01@minebea.co.th",
      role_id: 1,
      level_id: 1,
      division_id: 9999,
    };

    // Act: Send a POST request with missing required fields
    const response = await request(app)
      .post("/api/v1/authen/signup")
      .send(Data); // Empty payload (missing name and email)
    // Assert: Check that the response returns a 500 error
    expect(response.status).toBe(500);
    expect(response.body.result).toEqual(
      `Duplicate email Error: ${Data.email} is already exited`
    );
  });
});

describe("End-to-End Tests for login API", () => {
  it("should create a jwt login token via POST /login", async () => {
    // Create : Data for login
    const Data = {
      emp_no: "E5130",
      password: "password",
    };
    // Act: Send a POST request to create a new user
    const response = await request(app).post("/api/v1/authen/login").send(Data);

    // Assert: Verify the response status and the user data in the response
    expect(response.status).toBe(200);
    expect(response.body.result).toBe("Login successful");
    expect(response.body.token).not.toBeNull();
  });

  it("should return 500 for invalid POST emp no not found /login", async () => {
    // Create : Data for login
    const Data = {
      emp_no: "E9999",
      password: "password",
    };
    // Act: Send a POST request to create a new user
    const response = await request(app).post("/api/v1/authen/login").send(Data);
    // Assert: Verify the response status and the user data in the response
    expect(response.status).toBe(500);
    expect(response.body.result).toBe(
      `login error: ${Data.emp_no.toUpperCase()} is not found`
    );
  });

  it("should return 500 for invalid POST password mistake /login", async () => {
    // Create : Data for login
    const Data = {
      emp_no: "E5130",
      password: "mistakepassword",
    };
    // Act: Send a POST request to create a new user
    const response = await request(app).post("/api/v1/authen/login").send(Data);
    // Assert: Verify the response status and the user data in the response
    expect(response.status).toBe(500);
    expect(response.body.result).toBe(
      `login error: password is wrong with ${Data.emp_no}`
    );
  });
});

describe("End-to-End Tests for assign role API", () => {
  it("should assign role for user via PUT /assign_role", async () => {
    // Create a token using the same secret as your app
    const token = await jwt.sign(
      { emp_no: "E5130", role: "warehouse" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const Data = {
      role_id: 2,
      auth_id: 1,
    };
    // Act: Send a put request to assign role success
    const response = await request(app)
      .put("/api/v1/authen/assign_role")
      .set("Authorization", `Bearer ${token}`)
      .send(Data);
    // Assert: Verify the response status and the user data in the response
    expect(response.status).toBe(200);
    // Verify the user is saved in the database
    const roleInDb = await Authentication.findOne({
      attributes: ["role_id"],
      where: { auth_id: Data.auth_id },
      raw: true,
    });
    expect(roleInDb.role_id).toBe(2);
  });

  it("should return 403 for for unauthorized via PUT /assign_role", async () => {
    // Act: Send a put request to assign role success
    const response = await request(app)
      .put("/api/v1/authen/assign_role")
      .send({});
    //Assert: Verify the response status should return 403
    expect(response.status).toBe(403);
  });

  it("should return 500 for null data via PUT /assign_role", async () => {
    const token = await jwt.sign(
      { emp_no: "E5130", role: "warehouse" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    // Act: Send a put request to assign role success
    const response = await request(app)
      .put("/api/v1/authen/assign_role")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    //Assert: Verify the response status should return 500
    expect(response.status).toBe(500);
    expect(response.body.result).toBe(
      `Validation Error: "auth_id" is required`
    );
  });

  it("should return 500 for no have role id in db via PUT /assign_role", async () => {
    // Create a token using the same secret as your app
    const token = await jwt.sign(
      { emp_no: "E5130", role: "warehouse" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const Data = {
      role_id: 999,
      auth_id: 1,
    };
    // Act: Send a put request to assign role success
    const response = await request(app)
      .put("/api/v1/authen/assign_role")
      .set("Authorization", `Bearer ${token}`)
      .send(Data);
    // Assert: Verify the response status and the user data in the response
    expect(response.status).toBe(500);
    expect(response.body.result).toBe("assign role error: role_id not found");
  });

  it("should return 500 for no have auth id in db via PUT /assign_role", async () => {
    // Create a token using the same secret as your app
    const token = await jwt.sign(
      { emp_no: "E5130", role: "warehouse" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const Data = {
      role_id: 1,
      auth_id: 999,
    };
    // Act: Send a put request to assign role success
    const response = await request(app)
      .put("/api/v1/authen/assign_role")
      .set("Authorization", `Bearer ${token}`)
      .send(Data);
    // Assert: Verify the response status and the user data in the response
    expect(response.status).toBe(500);
    expect(response.body.result).toBe("assign role error: auth_id not found");
  });
});
