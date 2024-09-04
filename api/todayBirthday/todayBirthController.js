const Member=require('../Members/member-model');

exports.get = async (req, resp) => {
    try {
        const today = new Date();
        const todayMonth = today.getMonth() + 1;
        const todayDate = today.getDate();

        const allMembers = await Member.findAll({attributes:{
            exclude:'password'
        }});

        const filteredMembers = allMembers.filter(member => {
            const dob = new Date(member.dob);
            return dob.getMonth() + 1 === todayMonth && dob.getDate() === todayDate;
        });
      
        resp.status(200).json(filteredMembers); 

    } catch (error) {
        console.error('Error fetching data:', error);
        resp.status(500).json({ error: 'Internal Server Error' });
    }
};

