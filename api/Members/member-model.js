//Model Definition (member-model.js)


const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/db");
const bcrypt = require('bcryptjs');
const Nominee = require('./nominee_model');
const Role = require('../Rolemanagement/roleManagementModel');

class Member extends Model {
  async validatePassword(password) {
    return bcrypt.compare(password, this.password);
  }
}

Member.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    reference_id: {
      type: DataTypes.STRING(50),
      unique: true
    },
    gotra: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    father_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mother_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    marital_status: {
      type: DataTypes.ENUM('Single', 'Married', 'Widowed', 'Divorced'),
      allowNull: false
    },
    spouse_name


// const { DataTypes, Model } = require("sequelize");
// const sequelize = require("../../config/db");
// const bcrypt = require('bcryptjs');
// const Nominee=require('./nominee_model');
// const Role=require('../Rolemanagement/roleManagementModel');


// class Member extends Model {
//   async validatePassword(password) {
//     return bcrypt.compare(password, this.password);
//   }
// }

// Member.init(
//   {
//     id: {
//       type: DataTypes.BIGINT,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     reference_id: {
//       type: DataTypes.STRING(50),
//       unique: true
//     },
//     gotra: {
//       type: DataTypes.STRING(50),
//       allowNull: false
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     father_name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     mother_name: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     dob: {
//       type: DataTypes.DATEONLY,
//       allowNull: true
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       }
//     },
//     password: {
//       type: DataTypes.STRING(255),
//       allowNull: false
//     },
//     marital_status: {
//       type: DataTypes.ENUM('Single', 'Married', 'Widowed', 'Divorced'),
//       allowNull: false
//     },
//     spouse_name: {
//       type: DataTypes.STRING(200),
//       allowNull: true
//     },
//     mobile_no: {
//       type: DataTypes.STRING(20),
//       unique: true,
//       allowNull: false
//     },
//     address: {
//       type: DataTypes.TEXT,
//       allowNull: false
//     },
//     district: {
//       type: DataTypes.STRING(100),
//       allowNull: false
//     },
//     state: {
//       type: DataTypes.STRING(100),
//       allowNull: false
//     },
//     pincode: {
//       type: DataTypes.STRING(10),
//       allowNull: false
//     },
//     profession: {
//       type: DataTypes.STRING(100),
//       allowNull: true
//     },
//     aadhar_no: {
//       type: DataTypes.STRING(20),
//       unique: true,
//       allowNull: false
//     },
//     id_type: {
//       type: DataTypes.ENUM('Voter ID', 'Driving License', 'PAN Card'),
//       allowNull: false
//     },
//     id_no: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//       unique: true
//     },
//     id_file:{
//       type: DataTypes.STRING(200),
//       allowNull: true
//     },
//     status: {
//       type: DataTypes.ENUM('Pending', 'Active', 'Inactive'),
//       allowNull: false,
//       defaultValue: 'Active'
//     },
//     aadharUrl: {
//       type: DataTypes.STRING(200),
//       allowNull: true
//     },
//     profileUrl:{
//       type:DataTypes.STRING,
//       allowNull:true,
//     }
//   },
//   {
//     sequelize,
//     modelName: "Member",
//     tableName: "members",
//     timestamps: true,
//     hooks: {
//       beforeCreate: async (user) => {
//         if (user.password) {
//           const salt = await bcrypt.genSalt(10);
//           user.password = await bcrypt.hash(user.password, salt);
//         }
//       },
//       beforeUpdate: async (user) => {
//         if (user.changed('password')) {
//           const salt = await bcrypt.genSalt(10);
//           user.password = await bcrypt.hash(user.password, salt);
//         }
//       }
//     }
//   }
// );

// Member.hasMany(Nominee, { foreignKey: 'member_id', as: 'nominees' });
// Member.hasMany(Role,{foreignKey:'member_id',as:'Role'});

// module.exports = Member;
