/* TODO: function that returns all blogs existend as:
blog = {
    id: id of the blog - done
    public: true || false  - done
    title: title of the blog - done
    date: date of the blog - done
    photo: thumbnail
    subject: [what i talk about] - done
    description: some short text to display - done
    what-bothers-me: [
        {
            subtitle: basicallt the title of this subsection of what bother me - done
            photo: NULL || file.jpg/file.png => the html for this will be: a flex-row if photo != NULL, only a text elemenent if phot == NULL
            text: the text of this subsection - done
        }
    ]
    quote-of-the-week: {
            quote: the quote I found - done
            author: who said it/where did I find it
            photo: NULL || file.jpg/file.png => again, the html for this will adapt - done
    }
    what-is-new-in-tech || fdose-of-tech-stories: [
        {
            subtitle: basicallt the title of this subsection of what bother me
            photo: NULL || file.jpg/file.png => the html for this will be: a flex-row if photo != NULL, only a text elemenent if phot == NULL
            text: the text of this subsection
        }
    ]
    comments: [
        {
            user: name of the user
            email: email of the user
            date: when did he comment
            comment: what did he comment
        }
    ]
}
*/

import { create } from "zustand";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const useBlogStore = create((set) => ({
  blogs: [],

  // * function for fetching blogs
  fetchBlogs: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogs = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        const convertTimestamp = (timestamp) =>
          timestamp ? timestamp.toDate() : null;

        return {
          id: doc.id,
          public: data.public,
          title: data.title,
          date: convertTimestamp(data.date),
          photo: data.photo,
          subject: data.subject,
          description: data.description,
          whatBothersMe: data["what-bothers-me"]?.map((item) => ({
            subtitle: item.subtitle,
            photo: item.photo,
            text: item.text,
          })),
          quoteOfTheWeek: data["quote-of-the-week"]
            ? {
                quote: data["quote-of-the-week"].quote,
                author: data["quote-of-the-week"].author,
                photo: data["quote-of-the-week"].photo,
              }
            : null,
          whatIsNewInTech: data["what-is-new-in-tech"]?.map((item) => ({
            subtitle: item.subtitle,
            photo: item.photo,
            text: item.text,
          })),
          doseOfTechStories: data["dose-of-tech-stories"]?.map(
            (item) => ({
              subtitle: item.subtitle,
              photo: item.photo,
              text: item.text,
            })
          ),
          comments: data.comments?.map((comment) => ({
            user: comment.user,
            email: comment.email,
            date: convertTimestamp(comment.date),
            comment: comment.comment,
          })),
        };
      });

      set({ blogs });
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  },

  displayBlogs: [],

  // ! for the moment, this is useless because it occupies a ton of memory and I don't need it

  fetchDisplayBlogs: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      const blogs = querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          title: data.title,
          public: data.public,
          description: data.description,
          subject: data.subject,
          photo: data?.photo
        };
      });

      set({ displayBlogs: blogs });
    } catch (error) {
      console.error("Error fetching display blogs:", error);
      set({ displayBlogs: [] });
    }
  },

  fetchBlogById: async (id) => {
    try {
      const docRef = doc(db, "blogs", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const blog = docSnap.data();
        return {
          id: docSnap.id,
          title: blog.title,
          public: blog.public,
          description: blog.description,
          subject: blog.subject,
          createdAt: blog.date?.toDate() || null, // Convert Firestore Timestamp to JS Date
          photo: blog.photo || null,
          whatBothersMeSections: blog["what-bothers-me"] || [],
          quoteOfTheWeek: blog["quote-of-the-week"] || null,
          techStories: blog["what-is-new-in-tech"] || [],
          techStories2: blog["dose-of-tech-stories"] || [],
          comments: blog.comments || [],
        };
      } else {
        console.warn("Blog not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching blog by ID:", error.message);
      return null;
    }
  },
}));

export default useBlogStore;