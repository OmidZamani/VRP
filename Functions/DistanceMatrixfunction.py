import random

def generate_distance_matrix(num_locations, max_distance, filename):
    # Generate the distance matrix
    distance_matrix = []
    for i in range(num_locations):
        row = []
        for j in range(num_locations):
            if i == j:
                row.append(0) # Set the diagonal to zero
            else:
                distance = random.randint(1, max_distance) # Generate a random distance
                row.append(distance)
        distance_matrix.append(row)
    
    # Write the distance matrix to a file
    with open(filename, 'w') as file:
        file.write('[\n')
        for row in distance_matrix:
            file.write('    [' + ', '.join(map(str, row)) + '],\n')
        file.write(']\n')
    
    return distance_matrix

generate_distance_matrix(1000, 100, 'distance_matrix.txt')

print("done")