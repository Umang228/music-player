import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {FaMusic } from "react-icons/fa";

const SongList = ({ songs, setSongs, playSong }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSongs = Array.from(songs);
    const [movedSong] = reorderedSongs.splice(result.source.index, 1); // Remove the dragged song.
    reorderedSongs.splice(result.destination.index, 0, movedSong); // Insert at new position.

    setSongs(reorderedSongs); // Update the parent state with the reordered songs.
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="songs">
        {(provided) => (
          <table
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-full text-left border-collapse table-auto"
          >
            <thead>
              <tr className="text-white">
                <th className="p-4 text-center">#</th>
                <th className="p-4">Image</th>
                <th className="p-4">Title</th>
                <th className="p-4">Playing</th>
                <th className="p-4">Time</th>
                <th className="p-4">Album</th>
              </tr>
            </thead>
            <tbody>
              {songs.map((song, index) => (
                <Draggable key={song.id} draggableId={song.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <tr
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      onClick={() => playSong(song)}
                      className={`cursor-pointer border-b ${
                        song.playing
                          ? "bg-red-800 border-l-4 border-red-500"
                          : "hover:bg-none"
                      } ${snapshot.isDragging ? "bg-blue-800 shadow-lg" : ""}`}
                    >
                      <td className="p-4 text-center">
                        {song.playing ? <FaMusic className="text-red-600 text-lg" /> : index + 1}
                      </td>
                      <td className="p-4">
                        <img
                          src="/artist.jpeg"
                          alt={`${song.title} cover`}
                          className="w-10 h-10 object-cover rounded"
                        />
                      </td>
                      <td className="p-4">{song.title}</td>
                      <td className="p-4">{song.playing ? "Now Playing" : ""}</td>
                      <td className="p-4">{song.time}</td>
                      <td className="p-4">{song.artist}</td>
                    </tr>
                  )}
                </Draggable>
              ))}
              {provided.placeholder} {/* Required for proper functionality */}
            </tbody>
          </table>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SongList;
