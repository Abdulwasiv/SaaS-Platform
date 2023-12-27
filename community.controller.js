const Community = require('../models/community.model');

exports.getAllCommunities = async (req, res) => {
  try {
    // Retrieve all communities from the database
    const communities = await Community.find();
    res.status(200).json({ communities });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createCommunity = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newCommunity = new Community({
          name,
          description,
        });
    
        await newCommunity.save();
    
        res.status(201).json({ message: 'Community successfully created.', community: newCommunity });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

exports.getAllCommunityMembers = async (req, res) => {
    try {
        const { communityId } = req.params;
        const community = await Community.findById(communityId);
    
        if (!community) {
          return res.status(404).json({ message: 'Community not found.' });
        }
        const members = community.members;
        res.status(200).json({ members });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

exports.addUserAsMember = async (req, res) => {
    try {
        const { communityId } = req.params;
        const { userId } = req.body;
    
        const community = await Community.findById(communityId);
    
        if (!community) {
          return res.status(404).json({ message: 'Community not found.' });
        }
        const existingMember = community.members.find((member) => member.userId.toString() === userId);
    
        if (existingMember) {
          return res.status(400).json({ message: 'User is already a member of the community.' });
        }
        community.members.push({ userId });
    
        await community.save();
    
        res.status(200).json({ message: 'User successfully added to the community as a member.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};

exports.removeMemberFromCommunity = async (req, res) => {
    try {
        const { communityId, userId } = req.params;
        const community = await Community.findById(communityId);
        if (!community) {
          return res.status(404).json({ message: 'Community not found.' });
        }
        community.members = community.members.filter((member) => member.userId.toString() !== userId);
        await community.save();
    
        res.status(200).json({ message: 'User successfully removed from the community.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
};
