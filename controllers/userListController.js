import userModel from "../model/userModel.js";

export const getAllUserController = async (req, res) => {
  try {
    const userList = await userModel.find({ role: 0 });
    if (!userList) {
      res.status(404).json({ success: false });
    }
    res.status(200).json({ success: true, count: userList.length, userList });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in getallusercontroller",
      error,
    });
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await userModel.findByIdAndDelete(id);
    if (!deleteUser) {
      res.status(404).json({ success: false });
    }
    res.status(200).json({
      success: true,
      message: "user deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "error in delete user", error });
  }
};
