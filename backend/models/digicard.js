
import mongoose from 'mongoose';
const { Schema } = mongoose;

const digiCardSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String, default: 'John Doe' },
  position: { type: String, default: 'Position' },
  company: { type: String, default: 'xyzCompany' },
  socialTitle: { type: String, default: 'Social Links' },
  socialDesc: { type: String, default: 'Description' },
  about: { type: String, default: 'About' },
  description: {
    type: String,
    default:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
  contactDetails: [Schema.Types.Mixed],
  // contactDetails: [
  //   {
  //     Contact: {
  //       Label: { type: String, default: 'Contact :' },
  //       Number: { type: String, default: '' },
  //     },
  //   },
  //   {
  //     Email: {
  //       Label: { type: String, default: 'Email :' },
  //       EmailAddress: { type: String, default: '' },
  //     },
  //   },
  //   {
  //     Address: {
  //       Label: { type: String, default: 'Address :' },
  //       City: { type: String, default: '' },
  //       Country: { type: String, default: '' },
  //       State: { type: String, default: '' },
  //       Zipcode: { type: String, default: '' },
  //     },
  //   },
  // ],
  socialLinks: [
    {
      type: { type: String, default: 'Facebook' },
      url: { type: String, default: '' },
      title: { type: String, default: 'Facebook' },
      subtitle: { type: String, default: 'Follow us on Facebook' },
    },
  ],
  img:{
    data:Buffer,
    contentType:String
  }
});

const digiCard = mongoose.model('digiCard', digiCardSchema);

export default digiCard
