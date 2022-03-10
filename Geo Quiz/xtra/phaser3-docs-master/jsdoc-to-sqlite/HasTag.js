const hasTag = function (block, tag)
{
    if (Array.isArray(block.tags))
    {
        for (var i = 0; i < block.tags.length; i++)
        {
            if (block.tags[i].originalTitle === tag)
            {
                return 1;
            }
        }
    }

    return 0;
};

module.exports = hasTag;
