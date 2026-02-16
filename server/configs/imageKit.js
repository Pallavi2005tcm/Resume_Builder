import ImageKit from '@imagekit/nodejs';

const imagekit = new ImageKit({
  privateKey:process.env.IMAGEKIT_PRIVATE_KEY, //This is the default an cant be ommitted
})

export default imagekit