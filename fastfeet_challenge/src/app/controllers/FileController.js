import File from '../models/File';

class FileController {
  async store(request, response) {
    // return response.json(request.file); -> return all information about the file

    const { originalname: name, filename: path } = request.file;

    const file = await File.create({
      name,
      path,
    });

    return response.json(file);
  }
}

export default new FileController();
