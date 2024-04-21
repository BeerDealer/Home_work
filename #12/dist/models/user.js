const records = [
  {
    id: 1,
    username: "user",
    password: "123456",
    displayName: "demo user",
    email: "user@mail.ru",
  },
  {
    id: 2,
    username: "jill",
    password: "birthday",
    displayName: "Jill",
    email: "jill@example.com",
  },
];

function isObjectEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (
        value === null ||
        value === undefined ||
        value === "" ||
        value === 0 ||
        Number.isNaN(value) ||
        value === false
      ) {
        return true;
      }
    }
  }
  return false;
}

exports.findById = function (id, cb) {
  process.nextTick(function () {
    const idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error("User " + id + " does not exist"));
    }
  });
};

exports.findByUsername = function (username, cb) {
  process.nextTick(function () {
    let i = 0,
      len = records.length;
    for (; i < len; i++) {
      const record = records[i];
      if (record.username === username) {
        return cb(null, record);
      }
    }
    return cb(null, null);
  });
};

exports.verifyPassword = (user, password) => {
  return user.password === password;
};

exports.signup = (userData) => {
  if (isObjectEmpty(userData)) {
    throw new Error();
  }
  const { username, password, email, displayName } = userData;
  idx = records.length + 1;
  records.push({
    id: idx,
    username: username,
    password: password,
    displayName: displayName,
    email: email,
  });
};

exports.showRecords = () => {
  return records;
};
