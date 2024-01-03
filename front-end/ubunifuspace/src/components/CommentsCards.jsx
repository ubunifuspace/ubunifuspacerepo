import { UnstyledButton, Group, Avatar, Text, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { AvatarGenerator } from 'random-avatar-generator';

const CommentsCards = ({ commentText, date }) => {

    const dateObject = new Date(date);

    // Format the date using toLocaleString
    const formattedDate = dateObject.toLocaleString();
  
    const generator = new AvatarGenerator();

    return (
        <UnstyledButton className='comments_margin'>
            <Group>
                <Avatar
                    src={generator.generateRandomAvatar()}
                    radius="xl"
                />

                <div style={{ flex: 1 }}>
                    <Text size="md" fw={500}>
                        {commentText}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {formattedDate}
                    </Text>
                </div>

            </Group>
        </UnstyledButton>
    )
}

export default CommentsCards