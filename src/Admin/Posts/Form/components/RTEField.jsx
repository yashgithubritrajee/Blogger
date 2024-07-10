import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { usePostsForm } from '../../context/PostFormContext';



const modules = {
    toolbar: {
        container: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ size: ['extra-small', 'small', 'medium', 'large'] }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image', 'video'],
            [{ color: [] }, { background: [] }],
            ['clean'],
        ],
    },
};

export function RTEField() {
    const { data, handelData } = usePostsForm();

    const handleChange = (value) => {
        handelData('content', value);
    };

    return (
        <div>
           
            <ReactQuill className='bg-white'
                value={data?.content}
                onChange={handleChange}
                modules={modules}
                placeholder="Enter your content here..."
            />
        </div>
    );
}
